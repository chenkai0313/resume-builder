self.__MIDDLEWARE_MATCHERS = [
  {
    "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|api|favicon.ico|robots.txt|CNAME|.nojekyll).*))(\\.json)?[\\/#\\?]?$",
    "originalSource": "/((?!_next|api|favicon.ico|robots.txt|CNAME|.nojekyll).*)"
  }
];self.__MIDDLEWARE_MATCHERS_CB && self.__MIDDLEWARE_MATCHERS_CB()