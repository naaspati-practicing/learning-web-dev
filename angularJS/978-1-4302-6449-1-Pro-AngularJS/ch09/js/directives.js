function highlight() {
  return (scope, element, attrs) => {
    if (scope.day === parseInt(attrs[highlight.name]))
      element.css('color', 'red');
  }
}

module.exports = [highlight];