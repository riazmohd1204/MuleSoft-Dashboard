# Mule Code Review Rule Checks

API Name: leviC4E-omni-ecom-salesack-ama-epoch-sub
Branch: release-SOLAR-R3.3
Overall Verdict: FAILED

| Category | Rule ID | Rule Name | Status (Pass/Fail) | Raw Status | File/Line | Finding |
|---|---|---|---|---|---|---|
| eFramework Configuration | eframework-connector-version | eFramework Connector Version | PASS | PASSED | n/a | eframework-connector version is 2.1.1. ✓ |
| eFramework Configuration | eframework-impl-version | eFramework Implementation Version | PASS | PASSED | n/a | eframework-impl version is 2.1.1. ✓ |
| eFramework Configuration | newrelic-eframework | NewRelic Event Framework | FAIL | NOT_APPLICABLE | n/a | No NewRelic integration detected. |
| Business Events Configuration | business-events-count | Business Events - Main Process | PASS | PASSED | n/a | Found 1 business event(s). ✓ (Solar API — at least 1 required.) |
| Business Events Configuration | error-event-flow | Error Event Flow | FAIL | FAILED | salesAck.xml:line unknown | Flows WITHOUT error handlers: salesAckFlow (salesAck.xml) |
| Minimal Logging | minimal-logging-enabled | Minimal Logging Enabled | PASS | PASSED | pom.xml:line unknown | Minimal logging connector found in pom.xml (version: 1.1.1). ✓ |
| Minimal Logging | transaction-id-creation | Transaction ID Creation | PASS | PASSED | n/a | Minimal logging 'New' connector found for Transaction ID creation. ✓ |
| Minimal Logging | pull-all-operation | Put All Operation | PASS | PASSED | n/a | 'Put All' (min-log:put-all) operation found with transaction-id. ✓ |
| Minimal Logging | timed-scope | Timed Scope for Main Operation | PASS | PASSED | n/a | Timed scope found wrapping main operation with transactionProperties. ✓ |
| Minimal Logging | transaction-properties | Transaction Properties in Logging | FAIL | NEEDS_REVIEW | n/a | No reference to 'TransactionProperties' found in Mule XML files. Verify they are passed in all minimal logging operations. |
| POM File Connectors | recent-connectors | Recent Connector Versions | FAIL | NEEDS_REVIEW | n/a | Runtime version 4.9.6:5-java17 is compatible. 1 connector(s) can be upgraded: IBM MQ Connector: 1.7.2 → 2.0.6. 5 connector(s) already at latest. |
| POM File Connectors | reconnection-strategy | Reconnection Strategy | FAIL | FAILED | config.xml:line unknown | Connectors WITHOUT reconnection strategy: http:request-config in config.xml, http:request-config in config.xml, anypoint-mq:config in config.xml, ibm-mq:config in config.xml, http:listener-config in router.xml |
| POM File Connectors | ibm-mq-reconnection | IBM MQ Reconnection Strategy | PASS | PASSED | n/a | IBM MQ consumer reconnection set to 'forever'. ✓ |
| Runtime Version | latest-runtime | Latest Runtime Version | PASS | PASSED | n/a | Mule runtime version is 4.9.6:5-java17. ✓ |
| Logger Configuration | logger-debug-level | Logger Level - Debug | PASS | PASSED | n/a | All 4 logger(s) are set to DEBUG level. ✓ |
| MUnit Testing | munit-coverage | MUnit Coverage Threshold | PASS | PASSED | n/a | Live MUnit coverage is 96.61% (from undefined environment). Meets 80% threshold. ✓ |
| No Hard Coding | no-hardcoding | No Hardcoded Values | PASS | PASSED | n/a | No obvious hardcoded values found in property files. ✓ |
| No Hard Coding | remove-sensitive-passwords | No Real Secrets/Passwords in Property Files | PASS | PASSED | n/a | All property files checked — no real passwords, secrets, or sensitive data found. Values are properly externalized to CPS or masked. ✓ |
| Exchange Documentation | exchange-endpoints | API Endpoints Documentation | FAIL | NEEDS_REVIEW | n/a | 1 HTTP listener(s) found. Verify all endpoints are documented in Anypoint Exchange with method, path, description, and examples. |
| Exchange Documentation | exchange-documentation-link | Exchange Documentation Link Validation | PASS | PASSED | n/a | Exchange documentation validated using Exchange credentials. Exchange URL: https://anypoint.mulesoft.com/exchange/2e4d99ab-8cd1-4643-b467-e2c5d8ba6e6f/omni-ecom-salesack-ama-epoch-sub/minor/1.0/ |
| Exchange Documentation | design-center-viewer-access | Design Center Viewer Access Validation | FAIL | FAILED | n/a | Design Center API access failed with HTTP 403. Verify Design Center Viewer scope for the connected app. |
| Exchange Documentation | overview-page | Overview Page | FAIL | NEEDS_REVIEW | n/a | Verify Exchange main page has Overview section explaining business functionality, process context, and upstream/downstream dependencies. |
| Exchange Documentation | flow-description | Flow Description | FAIL | NEEDS_REVIEW | n/a | Verify documentation covers: source system, target system, intermediate components, and data transformations. |
| Exchange Documentation | sumologic-event-details | Sumo Logic Event Details | FAIL | NEEDS_REVIEW | n/a | Verify Sumo Logic event documentation includes: domain name, entity name, event types, custom fields, and dashboard references. |
| Exchange Documentation | minimal-logging-details | Minimal Logging Details | FAIL | NEEDS_REVIEW | n/a | Verify documentation includes: extra logged parameters, unique API identifier, correlation ID strategy. |
| Exchange Documentation | servicenow-incident-details | ServiceNow Incident Details | FAIL | NEEDS_REVIEW | n/a | Verify ServiceNow incident documentation includes sample incident with: number, category, assignment group, priority, and resolution. |
| RAML Specification | raml-synced | RAML Synced with Design Center | FAIL | NEEDS_REVIEW | api.raml:line unknown | api.raml found along with 6 API spec file(s). Verify content is synced with Anypoint Design Center. |
| RAML Specification | raml-version-match | api.raml Version Match | FAIL | NEEDS_REVIEW | api.raml:line unknown | 6 API spec file(s) found. Verify api.raml version matches the version in Anypoint Design Center. |

## Summary Fixes

1. Add error handling to flow salesAckFlow in salesAck.xml (on-error-propagate or on-error-continue).
2. Add reconnection strategy blocks to connectors in config.xml and router.xml that are currently missing reconnect/reconnect-forever definitions.
3. Update connected app permissions for Design Center Viewer so GET /designcenter/api-designer/projects returns 200 instead of 403.
