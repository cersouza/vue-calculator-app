Feature: Make calculations
  Make calculations with _any operators_ (eg.: "+", "-" , "/", "*" and "%")

Scenario Outline: Making Sums operations
  Given Clara open calculator
  When She inputs <number1> + <number2>
  Then should display <expectedResult> as result

  Examples:
    | number1 | number2 | expectedResult |
    |    2    |    2    |        4       |
    |    10   |    3    |       13       |
    |    10   |    10   |       20       |
    |    50   |    70   |       120      |
