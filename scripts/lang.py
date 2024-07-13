import docker

client = docker.from_env()
container_id = client.containers.list(all = True, filters={"name":"workforce-dashboard-db-1"})
container = client.containers.get(container_id[0].id)

langs=['en', 'ar', 'bn', 'fr', 'es', 'pl', 'zh_hant', 'ht', 'ko', 'ru', 'ur']

tables = {
    'page_landingpage': ['title', 'description', 'homepage_description'],
    'translation_strings_translationstring': ['frontend_text'],
    'page_mainnavigationitem': ['title', 'hover_description'],
    'common_metrics_metricname': ['display_name'],
    'common_metrics_metriccategory': ['display_name'],
    'common_metrics_metriccategorysubgroup': ['display_name', 'name'],
    'programs_agency': ['display_name'],
    'page_agencyitem': ['title', 'description', 'link_title'],
    'page_footernavigationitem': ['title'],
    'programs_program': ['display_name', 'description'],
    'programs_neighborhood': ['name'],
    'programs_population': ['name'],
    'programs_programtype': ['name'],
    'programs_contact': ['name'],
    'programs_programlink': ['label'],
    'visualizations_barchart': ['title', 'short_title', 'description', 'x_axis_title', 'y_axis_title', 'suffix'],
    'visualizations_datastorybarchart': ['title', 'short_title', 'description', 'x_axis_title', 'y_axis_title', 'categories', 'suffix'],
    'visualizations_datastorybarchartdataset': ['series_name'],
    'visualizations_datastorydualaxislineandcolumn': ['title', 'short_title', 'description', 'x_axis_title', 'y_axis_title', 'categories', 'suffix', 'alternate_axis_title'],
    'visualizations_datastorydualaxislineandcolumndataset': ['series_name'],
    'visualizations_datastorylinechart': ['title', 'short_title', 'description', 'x_axis_title', 'y_axis_title', 'categories', 'suffix'],
    'visualizations_datastoryscatterchart': ['title', 'short_title', 'description', 'x_axis_title', 'y_axis_title', 'suffix'],
    'visualizations_datastorylinechartdataset': ['series_name'],
    'visualizations_datastoryscatterchartdataset': ['series_name'],
    'visualizations_datastoryboxplot': ['title', 'short_title', 'description', 'x_axis_title', 'y_axis_title', 'categories'],
    'visualizations_datastoryboxplotdataset': ['series_name'],
    'visualizations_datastorysankey': ['title', 'short_title', 'description', 'x_axis_title', 'y_axis_title', 'categories', 'suffix'],
    'visualizations_datastorystackedbarchart': ['title', 'short_title', 'description', 'x_axis_title', 'y_axis_title', 'categories', 'suffix'],
    'visualizations_datastorystackedbarchartdataset': ['series_name'],
    'visualizations_dualaxislineandcolumn': ['title', 'short_title', 'description', 'x_axis_title', 'y_axis_title', 'categories', 'suffix', 'alternate_axis_title'],
    'visualizations_linechart': ['title', 'short_title', 'description', 'x_axis_title', 'y_axis_title', 'categories', 'suffix'],
    'visualizations_scatterchart': ['title', 'short_title', 'description', 'x_axis_title', 'y_axis_title', 'suffix'],
    'visualizations_boxplot': ['title', 'short_title', 'description', 'x_axis_title', 'y_axis_title', 'categories'],
    'visualizations_mapchart': ['title', 'short_title', 'description', 'x_axis_title', 'y_axis_title', 'categories', 'suffix'],
    'visualizations_shapefilecoordinate': ['title', 'tooltip_content'],
    'visualizations_coordinate': ['title', 'tooltip_content'],
    'visualizations_sankey': ['title', 'short_title', 'description', 'x_axis_title', 'y_axis_title'],
    'visualizations_stackedbarchart': ['title', 'short_title', 'description', 'x_axis_title', 'y_axis_title', 'suffix'],
    'data_stories_narrativesection': ['description', 'title', ]
}


# todo: repeat same functionality for RDS
# reference: https://trmccormick.com/aws_rds_postgres_python

# for i in tables:
#     for y in tables[i]:
#         for l in langs:
#             #create columns
#             sql = container.exec_run(f"psql -c '\c wdp' -c 'ALTER TABLE {i} ADD COLUMN {y}_{l} TEXT;'", user='postgres')
            
#             # In case we need to remove all columns
#             # sql = container.exec_run(f"psql -c '\c wdp' -c 'ALTER TABLE {i} DROP COLUMN {y}_{l};'", user='postgres')
#             print(sql.output.decode("utf-8"))

# print('Done')

# run it in case updated_date column already exist or not exist error during migration
# tables_drop = ['common_metrics_commonmetric', 'data_stories_datastory', 'page_basicpage', 'page_landingpage', 'programs_program']
# column_drop = 'updated_date'

tables_drop = ['visualizations_datastorybarchart', 'visualizations_datastorydualaxislineandcolumn', 'visualizations_datastorylinechart', 'visualizations_datastoryscatterchart', 'visualizations_datastoryboxplot', 'visualizations_datastorysankey', 'visualizations_datastorystackedbarchart']
column_drop = 'data_notes'

for i in tables_drop:
    sql = container.exec_run(f"psql -c '\c wdp' -c 'ALTER TABLE {i} DROP COLUMN {column_drop};'", user='postgres')
    # sql = container.exec_run(f"psql -c '\c wdp' -c 'ALTER TABLE {i} ADD COLUMN {column_drop} TEXT;'", user='postgres')