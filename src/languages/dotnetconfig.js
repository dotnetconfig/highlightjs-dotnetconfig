/*
Language: dotnetconfig
Description: Standard configuration for dotnet tools
Author: Daniel Cazzulino <daniel@cazzulino.com>
Category: common, config
Website: https://dotnetconfig.org
*/

export default function(hljs) {
  var NUMBER_SUFFIX = {
    className: 'built_in',
    begin: /(?<=\b\d+(\.\d+)?)([k|K|m|M|g|G|t|T][b|B]?)\b/
  };
  var NUMBER = {
    begin: /\b\d+(\.\d+)?(?=\b|([k|K|m|M|g|G|t|T][b|B]?)?\b)/
  };
  var QUOTED_STRING = {
    begin: '"',
    end: '"',
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  var COMMENT = hljs.COMMENT();
  COMMENT.variants = [
    {begin: /;/, end: /$/},
    {begin: /#/, end: /$/},
  ];
  var LITERAL = {
    className: 'built_in',
    begin: /\bon|off|true|false|yes|no\b/
  };


  var VARIABLE = /(?<=^\s*)\w[\w\d-]+(?=\s*(=|([#;]|$)))/;

  return {
    name: 'dotnetconfig',
    aliases: ['dotnetconfig', 'gitconfig'],
    case_insensitive: true,
    disableAutodetect: true,    
    illegal: /\S/,
    contains: [
      COMMENT,
      {
        className: 'meta',
        begin: /\[+/, end: /\]+/
      },
      {
        begin: VARIABLE,
        className: 'variable',
        starts: {
          end: /$/,
          contains: [
            COMMENT,
            NUMBER,
            NUMBER_SUFFIX,
            LITERAL,
            QUOTED_STRING
          ]
        }        
      }
    ]
  };
}
