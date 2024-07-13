class TinyMCESettings(object):
    """ This sets the settings for TinyMCE.
    """
    spellchecker = False

    def __getattr__(self, name):
        return self.a[name]

    def __init__(self, static_url):
        self.static_url = static_url

    @property
    def default_config(self):
        SEP = "|"
        cj = lambda l: ','.join(l)

        plugins = cj([
            "media", "tabfocus", "inlinepopups", "paste", "safari",
            "spellchecker", "table", "fullscreen", "directionality"
        ])

        theme_advanced_buttons1 = cj([
            "bold", "italic", "underline", "formatselect", "styleselect", SEP,
            "bullist", "numlist", "hr", "outdent", "indent", "blockquote", SEP,
            "link", "unlink", "anchor", "ltr,rtl"
        ])

        theme_advanced_buttons2 = cj([
            "table", "delete_table", "row_props", "cell_props", "delete_col",
            "col_after", "col_before", "delete_row", "row_after", "row_before",
            "split_cells", "merge_cells", SEP, "selectall", "pastetext",
            "pasteword", "charmap", SEP, "cleanup", "undo", "redo", "image",
            SEP, "fullscreen", "code", "removeformat"
        ])

        theme_advanced_buttons3 = ""

        style_formats = [
            {'title': "Lead", 'block': 'p', 'classes': 'lead'},
        ]

        content_css = "{}stylesheets/admin/tinymce.css".format(self.static_url)

        return {
            'theme': "advanced",
            'skin': "modern",
            'inlinepopups_skin': "modern",
            'relative_urls': False,
            'height': "350px",
            'width': "620px",
            'plugins': plugins,
            'theme_advanced_blockformats': cj([
                'p', 'h2', 'h3', 'h4', 'h5', 'h6',
            ]),
            'theme_advanced_buttons1': theme_advanced_buttons1,
            'theme_advanced_buttons2': theme_advanced_buttons2,
            'theme_advanced_buttons3': theme_advanced_buttons3,
            'theme_advanced_toolbar_location': "top",
            'theme_advanced_toolbar_align': "left",
            'theme_advanced_statusbar_location': "bottom",
            'theme_advanced_resizing': True,
            'theme_advanced_resize_horizontal': "",
            'tab_focus': ':prev,:next',
            'button_tile_map': True,
            'paste_create_linebreaks': False,
            'paste_create_paragraphs': True,
            'paste_auto_cleanup_on_paste': True,
            'paste_convert_middot_lists': True,
            'paste_convert_headers_to_strong': False,
            'paste_remove_spans': True,
            'paste_remove_styles': True,
            'paste_strip_class_attributes': "all",
            'paste_use_dialog': False,
            'content_css': content_css,
            'style_formats': style_formats,
            'valid_elements': (
                "@[id|class|style|title|dir<ltr?rtl|lang|xml::lang|onclick|"
                "ondblclick|onmousedown|onmouseup|onmouseover|onmousemove|"
                "onmouseout|onkeypress|onkeydown|onkeyup],a[rel|rev|charset|"
                "hreflang|tabindex|accesskey|type|name|href|target|title|"
                "class|onfocus|onblur],strong/b,em/i,strike,u,#p,-ol[type|"
                "compact],-ul[type|compact],-li,br,img[longdesc|usemap|src|"
                "border|alt=|title|hspace|vspace|width|height|align],-sub,"
                "-sup,-blockquote,-table[border=0|cellspacing|cellpadding|"
                "width|frame|rules|height|align|summary|bgcolor|background|"
                "bordercolor],-tr[rowspan|width|height|align|valign|bgcolor|"
                "background|bordercolor],tbody,thead,tfoot,#td[colspan|"
                "rowspan|width|height|align|valign|bgcolor|background|"
                "bordercolor|scope],#th[colspan|rowspan|width|height|align|"
                "valign|scope],caption,-div,-span,-code,-pre,address,-h1,-h2,"
                "-h3,-h4,-h5,-h6,hr[size|noshade],-font[face|size|color],dd,"
                "dl,dt,cite,abbr,acronym,del[datetime|cite],ins[datetime|"
                "cite],object[classid|width|height|codebase|*],param[name|"
                "value|_value],embed[type|width|height|src|*],script[src|"
                "type],map[name],area[shape|coords|href|alt|target],bdo,"
                "button,col[align|char|charoff|span|valign|width],colgroup["
                "align|char|charoff|span|valign|width],dfn,fieldset,form["
                "action|accept|accept-charset|enctype|method],kbd,label[for],"
                "legend,noscript,optgroup[label|disabled],option[disabled|"
                "label|selected|value],q[cite],samp,select[disabled|multiple|"
                "name|size],small,textarea[cols|rows|disabled|name|readonly],"
                "tt,var,big"
            )
        }
