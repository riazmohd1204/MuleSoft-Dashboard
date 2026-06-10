require('dotenv').config();
const axios = require('axios');

// Mule Connectors channel webhook URL (loaded from .env)
const TEAMS_WEBHOOK_URL = process.env.TEAMS_WEBHOOK_URL;

if (!TEAMS_WEBHOOK_URL) {
    console.error('ERROR: TEAMS_WEBHOOK_URL environment variable is not set. Add it to .env file.');
    process.exit(1);
}

// Connector list with versions from ConnectorUpdateChecker
const connectorList = [
    {
        key: 'http',
        name: 'HTTP Connector',
        exchangeId: 'org.mule.connectors:mule-http-connector',
        currentVersion: '1.9.0',
        type: 'core',
        documentation: 'https://docs.mulesoft.com/connectors/http/http-connector'
    },
    {
        key: 'database',
        name: 'Database Connector',
        exchangeId: 'org.mule.connectors:mule-db-connector',
        currentVersion: '1.14.5',
        type: 'core',
        documentation: 'https://docs.mulesoft.com/connectors/db/db-connector'
    },
    {
        key: 'salesforce',
        name: 'Salesforce Connector',
        exchangeId: 'org.mule.connectors:mule-salesforce-connector',
        currentVersion: '10.21.0',
        type: 'standard',
        documentation: 'https://docs.mulesoft.com/connectors/salesforce/salesforce-connector'
    },
    {
        key: 'file',
        name: 'File Connector',
        exchangeId: 'org.mule.connectors:mule-file-connector',
        currentVersion: '1.5.1',
        type: 'core',
        documentation: 'https://docs.mulesoft.com/connectors/file/file-connector'
    },
    {
        key: 'ftp',
        name: 'FTP Connector',
        exchangeId: 'org.mule.connectors:mule-ftp-connector',
        currentVersion: '1.8.5',
        type: 'core',
        documentation: 'https://docs.mulesoft.com/connectors/ftp/ftp-connector'
    },
    {
        key: 'jms',
        name: 'JMS Connector',
        exchangeId: 'org.mule.connectors:mule-jms-connector',
        currentVersion: '1.8.4',
        type: 'core',
        documentation: 'https://docs.mulesoft.com/connectors/jms/jms-connector'
    },
    {
        key: 'vm',
        name: 'VM Connector',
        exchangeId: 'org.mule.connectors:mule-vm-connector',
        currentVersion: '2.0.0',
        type: 'core',
        documentation: 'https://docs.mulesoft.com/connectors/vm/vm-connector'
    },
    {
        key: 'email',
        name: 'Email Connector',
        exchangeId: 'org.mule.connectors:mule-email-connector',
        currentVersion: '1.7.1',
        type: 'core',
        documentation: 'https://docs.mulesoft.com/connectors/email/email-connector'
    },
    {
        key: 'sap',
        name: 'SAP Connector',
        exchangeId: 'com.mulesoft.connectors:mule-sap-connector',
        currentVersion: '5.9.0',
        type: 'premium',
        documentation: 'https://docs.mulesoft.com/connectors/sap/sap-connector'
    },
    {
        key: 'kafka',
        name: 'Apache Kafka Connector',
        exchangeId: 'org.mule.connectors:mule-kafka-connector',
        currentVersion: '4.8.0',
        type: 'standard',
        documentation: 'https://docs.mulesoft.com/connectors/kafka/kafka-connector'
    },
    {
        key: 'apikit',
        name: 'Mule APIKit Module',
        exchangeId: 'org.mule.modules:mule-apikit-module',
        currentVersion: '1.10.2',
        type: 'core',
        documentation: 'https://docs.mulesoft.com/apikit/4.x/'
    },
    {
        key: 'anypoint-mq',
        name: 'Anypoint MQ Connector',
        exchangeId: 'com.mulesoft.connectors:anypoint-mq-connector',
        currentVersion: '4.0.5',
        type: 'standard',
        documentation: 'https://docs.mulesoft.com/connectors/anypoint-mq/anypoint-mq-connector'
    },
    {
        key: 'ibm-mq',
        name: 'IBM MQ Connector',
        exchangeId: 'com.mulesoft.connectors:mule-ibm-mq-connector',
        currentVersion: '1.7.3',
        type: 'premium',
        documentation: 'https://docs.mulesoft.com/connectors/ibm/ibm-mq-connector'
    },
    {
        key: 'sftp',
        name: 'SFTP Connector',
        exchangeId: 'org.mule.connectors:mule-sftp-connector',
        currentVersion: '2.0.0',
        type: 'core',
        documentation: 'https://docs.mulesoft.com/connectors/sftp/sftp-connector'
    },
    {
        key: 'google-pubsub',
        name: 'Google Pub/Sub Connector',
        exchangeId: 'com.mulesoft.connectors:mule-google-pubsub-connector',
        currentVersion: '1.2.0',
        type: 'premium',
        documentation: 'https://docs.mulesoft.com/connectors/google/google-pubsub-connector'
    },
    {
        key: 'workday',
        name: 'Workday Connector',
        exchangeId: 'com.mulesoft.connectors:mule-workday-connector',
        currentVersion: '14.0.0',
        type: 'premium',
        documentation: 'https://docs.mulesoft.com/connectors/workday/workday-connector'
    },
    {
        key: 'mongodb',
        name: 'MongoDB Connector',
        exchangeId: 'org.mule.connectors:mule-mongodb-connector',
        currentVersion: '6.3.8',
        type: 'standard',
        documentation: 'https://docs.mulesoft.com/connectors/mongodb/mongodb-connector'
    },
    {
        key: 'amazon-s3',
        name: 'Amazon S3 Connector',
        exchangeId: 'com.mulesoft.connectors:mule-amazon-s3-connector',
        currentVersion: '6.4.1',
        type: 'premium',
        documentation: 'https://docs.mulesoft.com/connectors/amazon/amazon-s3-connector'
    },
    {
        key: 'microsoft-dynamics',
        name: 'Microsoft Dynamics 365 Connector',
        exchangeId: 'com.mulesoft.connectors:mule-microsoft-dynamics-365-connector',
        currentVersion: '2.7.0',
        type: 'premium',
        documentation: 'https://docs.mulesoft.com/connectors/ms-dynamics/ms-dynamics-365-connector'
    },
    {
        key: 'servicenow',
        name: 'ServiceNow Connector',
        exchangeId: 'com.mulesoft.connectors:mule-servicenow-connector',
        currentVersion: '6.13.0',
        type: 'premium',
        documentation: 'https://docs.mulesoft.com/connectors/servicenow/servicenow-connector'
    },
    {
        key: 'netsuite',
        name: 'NetSuite Connector',
        exchangeId: 'com.mulesoft.connectors:mule-netsuite-connector',
        currentVersion: '11.8.0',
        type: 'premium',
        documentation: 'https://docs.mulesoft.com/connectors/netsuite/netsuite-connector'
    },
    {
        key: 'azure-service-bus',
        name: 'Microsoft Azure Service Bus Connector',
        exchangeId: 'com.mulesoft.connectors:mule-microsoft-azure-service-bus-connector',
        currentVersion: '1.2.0',
        type: 'premium',
        documentation: 'https://docs.mulesoft.com/connectors/azure/azure-service-bus-connector'
    },
    {
        key: 'munit',
        name: 'MUnit Testing Framework',
        exchangeId: 'com.mulesoft.munit:munit-runner',
        currentVersion: '2.3.17',
        type: 'core',
        documentation: 'https://docs.mulesoft.com/munit/2.3/'
    },
    {
        key: 'munit-tools',
        name: 'MUnit Tools',
        exchangeId: 'com.mulesoft.munit:munit-tools',
        currentVersion: '2.3.17',
        type: 'core',
        documentation: 'https://docs.mulesoft.com/munit/2.3/munit-tools'
    },
    {
        key: 'mule4-eframework2',
        name: 'Mule 4 eFramework 2',
        exchangeId: 'com.custom.framework:mule4-eframework2',
        currentVersion: '2.1.1',
        type: 'custom',
        documentation: 'Internal framework documentation'
    },
    {
        key: 'mule4-eframework-impl',
        name: 'Mule 4 eFramework Implementation',
        exchangeId: 'com.custom.framework:mule4-eframework-impl',
        currentVersion: '2.1.1',
        type: 'custom',
        documentation: 'Internal framework implementation documentation'
    },
    {
        key: 'cps-connector',
        name: 'CPS Connector',
        exchangeId: 'com.custom.connectors:cps-connector',
        currentVersion: '1.0.10',
        type: 'custom',
        documentation: 'CPS Connector documentation'
    },
    {
        key: 'minimal-logging',
        name: 'Minimal Logging Framework',
        exchangeId: 'com.custom.logging:minimal-logging',
        currentVersion: '1.1.1',
        type: 'custom',
        documentation: 'Minimal logging framework documentation'
    }
];

function generateConnectorTable() {
    // Group connectors by type
    const coreConnectors = connectorList.filter(c => c.type === 'core');
    const standardConnectors = connectorList.filter(c => c.type === 'standard');
    const premiumConnectors = connectorList.filter(c => c.type === 'premium');
    const customConnectors = connectorList.filter(c => c.type === 'custom');

    let table = "";

    if (coreConnectors.length > 0) {
        table += "**🔵 Core Connectors** (Included with Mule Runtime)\n\n";
        table += "| Connector | Version | Exchange ID |\n";
        table += "|-----------|---------|-------------|\n";
        coreConnectors.forEach(conn => {
            const shortId = conn.exchangeId.length > 35 ? conn.exchangeId.substring(0, 32) + "..." : conn.exchangeId;
            const version = conn.currentVersion || 'N/A';
            table += `| ${conn.name} | **${version}** | \`${shortId}\` |\n`;
        });
        table += "\n";
    }

    if (standardConnectors.length > 0) {
        table += "**🟢 Standard Connectors** (Available in Exchange)\n\n";
        table += "| Connector | Version | Exchange ID |\n";
        table += "|-----------|---------|-------------|\n";
        standardConnectors.forEach(conn => {
            const shortId = conn.exchangeId.length > 35 ? conn.exchangeId.substring(0, 32) + "..." : conn.exchangeId;
            const version = conn.currentVersion || 'N/A';
            table += `| ${conn.name} | **${version}** | \`${shortId}\` |\n`;
        });
        table += "\n";
    }

    if (premiumConnectors.length > 0) {
        table += "**🟡 Premium Connectors** (Requires License)\n\n";
        table += "| Connector | Version | Exchange ID |\n";
        table += "|-----------|---------|-------------|\n";
        premiumConnectors.forEach(conn => {
            const shortId = conn.exchangeId.length > 35 ? conn.exchangeId.substring(0, 32) + "..." : conn.exchangeId;
            const version = conn.currentVersion || 'N/A';
            table += `| ${conn.name} | **${version}** | \`${shortId}\` |\n`;
        });
        table += "\n";
    }

    if (customConnectors.length > 0) {
        table += "**🟣 Custom/Internal Connectors** (Levi Strauss & Co)\n\n";
        table += "| Connector | Version | Exchange ID |\n";
        table += "|-----------|---------|-------------|\n";
        customConnectors.forEach(conn => {
            const shortId = conn.exchangeId.length > 35 ? conn.exchangeId.substring(0, 32) + "..." : conn.exchangeId;
            const version = conn.currentVersion || 'N/A';
            table += `| ${conn.name} | **${version}** | \`${shortId}\` |\n`;
        });
        table += "\n";
    }

    return table;
}

async function sendConnectorListToTeams() {
    try {
        console.log('📊 Generating MuleSoft Connector List Report...\n');

        const now = new Date();
        const coreCount = connectorList.filter(c => c.type === 'core').length;
        const standardCount = connectorList.filter(c => c.type === 'standard').length;
        const premiumCount = connectorList.filter(c => c.type === 'premium').length;
        const customCount = connectorList.filter(c => c.type === 'custom').length;

        // Create enhanced MessageCard matching certificate report format for consistent notifications
        const connectorCard = {
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            "themeColor": "#0078D4", // MuleSoft Blue
            "summary": `📚 MuleSoft Connector Catalog - ${connectorList.length} Connectors Available`,
            "sections": [
                {
                    "activityTitle": "📚 **MuleSoft Connector Catalog**",
                    "activitySubtitle": `${now.toLocaleDateString()} • ${now.toLocaleTimeString()} PT`,
                    "activityImage": "https://docs.mulesoft.com/general/_images/logo-cloud.png",
                    "facts": [
                        {
                            "name": "📊 Total Connectors",
                            "value": connectorList.length.toString()
                        },
                        {
                            "name": "🔵 Core Connectors",
                            "value": `${coreCount} connectors`
                        },
                        {
                            "name": "🟢 Standard Connectors",
                            "value": `${standardCount} connectors`
                        },
                        {
                            "name": "🟡 Premium Connectors",
                            "value": `${premiumCount} connectors`
                        },
                        {
                            "name": "🟣 Custom Connectors",
                            "value": `${customCount} connectors (Levi Strauss & Co)`
                        },
                        {
                            "name": "📖 Documentation",
                            "value": "MuleSoft Docs & Internal Wiki"
                        }
                    ],
                    "markdown": true
                },
                {
                    "activityTitle": "📋 **Complete Connector List**",
                    "text": generateConnectorTable(),
                    "markdown": true
                },
                {
                    "activityTitle": "💡 **Usage Guidelines**",
                    "text": `**Connector Selection Best Practices:**\n\n` +
                           `🔵 **Core Connectors** - Use for basic integration patterns (HTTP, File, Database, etc.)\n` +
                           `🟢 **Standard Connectors** - Ideal for common enterprise integrations (Kafka, MongoDB, etc.)\n` +
                           `🟡 **Premium Connectors** - Required for specific enterprise systems (SAP, Workday, Salesforce)\n` +
                           `🟣 **Custom Connectors** - Internal Levi Strauss & Co frameworks and tools\n\n` +
                           `**Update Management:**\n` +
                           `• Check for connector updates regularly using the Code Review Chatbot\n` +
                           `• Use command: \`check updates <connector-name>\` for specific connector info\n` +
                           `• Review release notes before upgrading to new versions\n` +
                           `• Test connector upgrades in development environment first\n\n` +
                           `**Custom Connectors (Levi Strauss & Co):**\n` +
                           `• **eFramework 2 (v2.1.1)** - Enterprise framework for standardized patterns\n` +
                           `• **CPS Connector (v1.0.10)** - Custom Protocol System integration\n` +
                           `• **Minimal Logging (v1.1.1)** - Lightweight logging framework`,
                    "markdown": true
                },
                {
                    "activityTitle": "🔍 **How to Use This Information**",
                    "text": `**For Developers:**\n` +
                           `• Reference Exchange IDs when adding dependencies to pom.xml\n` +
                           `• Check documentation links for connector configuration guidance\n` +
                           `• Verify connector type to understand licensing requirements\n\n` +
                           `**For Code Reviews:**\n` +
                           `• Verify correct connector is being used for the use case\n` +
                           `• Check for deprecated or outdated connector versions\n` +
                           `• Ensure custom connectors are using latest approved versions\n\n` +
                           `**For Project Planning:**\n` +
                           `• Identify licensing requirements based on connector types\n` +
                           `• Plan for custom connector updates and maintenance\n` +
                           `• Consider connector compatibility with Mule 4.x versions`,
                    "markdown": true
                }
            ],
            "potentialAction": [
                {
                    "@type": "ActionCard",
                    "name": "📖 Browse MuleSoft Exchange",
                    "actions": [
                        {
                            "@type": "OpenUri",
                            "name": "🌐 Open Anypoint Exchange",
                            "targets": [
                                {
                                    "os": "default",
                                    "uri": "https://www.mulesoft.com/exchange/"
                                }
                            ]
                        }
                    ]
                },
                {
                    "@type": "ActionCard",
                    "name": "📚 MuleSoft Documentation",
                    "actions": [
                        {
                            "@type": "OpenUri",
                            "name": "📖 Connectors Documentation",
                            "targets": [
                                {
                                    "os": "default",
                                    "uri": "https://docs.mulesoft.com/connectors/"
                                }
                            ]
                        }
                    ]
                },
                {
                    "@type": "ActionCard",
                    "name": "🛠️ Code Review Chatbot",
                    "actions": [
                        {
                            "@type": "OpenUri",
                            "name": "📋 Check Connector Updates",
                            "targets": [
                                {
                                    "os": "default",
                                    "uri": "https://github.com/LS-CO/mule-code-review-chatbot"
                                }
                            ]
                        }
                    ]
                },
                {
                    "@type": "ActionCard",
                    "name": "📞 Contact Integration Team",
                    "actions": [
                        {
                            "@type": "OpenUri",
                            "name": "📧 Email DevTeam ML",
                            "targets": [
                                {
                                    "os": "default",
                                    "uri": "mailto:devteamml@levi.com?subject=MuleSoft Connector Information Request&body=Hello Integration Team,%0D%0A%0D%0AI have a question regarding MuleSoft connectors:%0D%0A%0D%0AConnector Name: [Please specify]%0D%0AQuestion Type:%0D%0A[ ] Connector Selection%0D%0A[ ] Version Compatibility%0D%0A[ ] Custom Connector Usage%0D%0A[ ] Licensing Requirements%0D%0A[ ] Technical Support%0D%0A[ ] Other: ________________%0D%0A%0D%0ADetails:%0D%0A[Please provide additional context]%0D%0A%0D%0AThank you!"
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        // Send to Teams
        console.log('📤 Sending connector list to Teams...');
        const response = await axios.post(TEAMS_WEBHOOK_URL, connectorCard, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            console.log('✅ Connector list sent to Teams successfully!');
            console.log('\n📊 Report Summary:');
            console.log(`   • Total Connectors: ${connectorList.length}`);
            console.log(`   • Core: ${coreCount} | Standard: ${standardCount} | Premium: ${premiumCount} | Custom: ${customCount}`);
            console.log(`   • Custom Connectors:`);
            console.log(`     - eFramework 2: v2.1.1`);
            console.log(`     - eFramework Implementation: v2.1.1`);
            console.log(`     - CPS Connector: v1.0.10`);
            console.log(`     - Minimal Logging: v1.1.1`);
            return true;
        } else {
            console.log('❌ Failed to send connector list to Teams');
            return false;
        }

    } catch (error) {
        console.error('💥 Error sending connector list to Teams:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', JSON.stringify(error.response.data, null, 2));
        }
        return false;
    }
}

// Run the report
if (require.main === module) {
    sendConnectorListToTeams();
}

module.exports = { sendConnectorListToTeams, connectorList };
