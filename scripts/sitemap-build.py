import requests
from datetime import datetime

INPUT_DATETIME_FORMAT = '%Y-%m-%dT%H:%M:%S.%f'
OUTPUT_DATETIME_FORMAT = '%Y-%m-%d'
OUTPUT_PATH = '../source/sitemap.xml'
BASE_URL = 'https://workforcedata.nyc.gov'
ROUTES = [
    '/',
    '/data-stories',
    '/data-stories/:slug',
    '/common-metrics/:slug', # /common-metrics is contained in /common-metrics/clients-served
    '/subscribe',
    # Todo: crawl the following /:slug generic routes automatically
    '/about',
    '/data-guidance',
    '/programs'
]
EXCLUDE_TRANSLATION_ROUTES = ['/subscribe'] # Routes we know lack translation

class SitemapBuilder():
    built_xml = None
    totalRoutes = 0
    alt_languages = None

    def fetch_alt_languages(self):
        # Todo: endpoint for listing active site languages
        # Until then, fetch one of the standard metrics and crawl available translations
        if self.alt_languages == None:
            common_metrics_page = self.api_call('/api/v1/common-metrics/').json()
            self.alt_languages = common_metrics_page['common_metric_menu_items'][0]['translations'].keys()
            self.alt_languages = list(map(lambda language_code: language_code.replace('-hant', ''), self.alt_languages)) # Fix Chinese language code

        return self.alt_languages

    def append_url(self, path: str, last_mod: str|None = None):
        self.built_xml += f"""
    <url>
        <loc>{BASE_URL}/en{path}</loc>
        <changefreq>monthly</changefreq>"""

        if last_mod:
            self.built_xml += f"""
        <lastmod>{last_mod}</lastmod>"""

        if path not in EXCLUDE_TRANSLATION_ROUTES:
            for language in self.fetch_alt_languages():
                self.built_xml += f"""
        <xhtml:link rel="alternate" hreflang="{language}" href="{BASE_URL}/{language}{path}" />"""

        self.built_xml += f"""
    </url>"""

        self.totalRoutes += 1

    def api_call(self, endpoint: str) -> requests.Response:
        return requests.get(
            f'{BASE_URL}/en{endpoint}',
            headers={'Accept': 'application/json, text/plain, */*'}
        )

    def format_date(self, input: str) -> str:
        return datetime.strptime(input, INPUT_DATETIME_FORMAT).strftime(OUTPUT_DATETIME_FORMAT)

    def build(self):    
        self.built_xml = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">"""
        
        for route in ROUTES:
            if (':' not in route):
                self.append_url(route)
            elif ('/data-stories/:slug' == route):
                stories = self.api_call('/api/v1/data-stories/').json()
                for story in stories:
                    self.append_url(
                        path = f"/data-stories/{story['slug']}",
                        last_mod = self.format_date(story['updated_at'])
                    )
            elif ('/common-metrics/:slug' == route):
                response = self.api_call('/api/v1/common-metrics/').json()
                for metric in response['common_metric_menu_items']:
                    self.append_url(f"/common-metrics/{metric['slug']}")
            else:
                print(f"Skipping path with unknown request parameter: {route}")
                
        self.built_xml += """
</urlset>"""

        sitemap_file = open(OUTPUT_PATH, "w")
        sitemap_file.write(self.built_xml)
        sitemap_file.close()

        print(f"Successfuly added {self.totalRoutes} routes to {OUTPUT_PATH}")

SitemapBuilder().build()