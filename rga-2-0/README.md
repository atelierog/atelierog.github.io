# RGA 2.0 Calculator — Prototype

Public static guided calculator page hosted in the `atelierog.github.io` repository.

## Workflow
1. Enter customer/account details.
2. Add products one at a time.
3. Review the account credit-note value and export product details as CSV.

## Calculation integrity
The source workbook's explicit credit-note formula is `C3 * D3` (accumulated RGA grams × 22K gold rate). The workbook contains broken wastage lookup formulas (#REF!) in the product discount area. This prototype intentionally does not fabricate RGA product discounts, wastage, or final payable calculations.

## Privacy
This static page runs in the browser. It does not upload customer entries to a server or include the original workbook. Do not publish proprietary workbook data or customer records to a public repository without authorization.

## Public page
https://atelierog.github.io/rga-2-0/
