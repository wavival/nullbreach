# Delivery rules

## Promotion gate — mandatory

Never create, merge, push, or otherwise promote changes to the next environment branch while any required check for the current source commit is pending, failing, cancelled, skipped because of a failure, or unavailable.

The only valid direction is `feature/* → dev → stg → main`. A source commit may advance only after all required quality, security, test, review, and applicable deployment checks have concluded successfully. A deployment that was not configured or was skipped is not evidence that the source is eligible for promotion.

When a check fails, stop the promotion flow. Diagnose and correct the failure on a permitted source branch, re-run the full check set, and verify every required check is green before proceeding.
