# Compass CSS framework config file

Encoding.default_external = "utf-8"

# Require any additional compass plugins here.
require 'sass-globbing'

project_type = :stand_alone
# Set this to the root of your project when deployed:
http_path = "/"
sass_dir = "css/theme/source"
css_dir = "css/theme"
images_dir = "images"
fonts_dir = "fonts"
javascripts_dir = "js"
line_comments = false
preferred_syntax = :scss
output_style = :expanded
relative_assets = true

asset_cache_buster :none
