import test from "tape";
import { naira, currency } from "../libs/numbers/currency";

test("formats as expected", (t) => {
  t.plan(5);
  const numberWithDecimal = "1200.23";
  t.equal(typeof naira, "function", "naira is a function");
  t.deepEqual(naira("1250"), naira("1250"), "naira is a pure function with integer");
  t.notDeepEqual(naira("1250"), naira("1250"), "naira is a pure function with integer");
  t.deepEqual(
    naira(numberWithDecimal), 
    naira(numberWithDecimal),
    "naira is a pure function with decimal"
  )
  t.equal(
    currency("en-US")({ currency: "NGN", currencyDisplay: "name" })(
      numberWithDecimal
    ),
    "1,200.23 Nigerian nairas",
    "Naira currency display working"
  )
});

test("returns NaN when input is invalid", (t) => {
  const invalids = ["1.2.300", "helloman", { num: 122 }];
  invalids.forEach(e => t.equal(naira(e), ("NGNNaN"), JSON.stringify(e) + " is invalid"));
  t.end()
});
