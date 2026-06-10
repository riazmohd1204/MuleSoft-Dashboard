# Mule Code Review Chatbot

An intelligent chatbot for reviewing MuleSoft code, providing best practices guidance, and checking for connector updates. This tool helps developers improve their Mule applications by analyzing code quality, suggesting optimizations, monitoring connector versions, and answering questions about MuleSoft development.

## Features

🤖 **Interactive Chatbot**: Chat with the bot about Mule development questions
📁 **Project Analysis**: Analyze entire Mule projects for issues and improvements
🔍 **File Analysis**: Review individual Mule configuration files
💡 **Best Practices**: Get recommendations for Mule development best practices
⚡ **Performance Tips**: Receive optimization suggestions for better performance
🔒 **Security Guidelines**: Learn about secure MuleSoft development practices
🛠️ **Error Handling**: Get guidance on proper error handling patterns
🌐 **Web Interface**: Use through a web browser or REST API
💬 **Real-time Chat**: WebSocket support for real-time conversations
🔄 **Connector Updates**: Check for latest connector versions and security updates
🚨 **Security Alerts**: Monitor connector security vulnerabilities and deprecation warnings
📊 **Update Reporting**: Comprehensive reports on connector status and compatibility

## Quick Start

### Prerequisites

- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Chatbot

#### CLI Mode (Interactive)
```bash
npm start
```

#### Web Server Mode
```bash
npm start
# Then select "Start web server" option
# Open http://localhost:3000 in your browser
```

#### Development Mode
```bash
npm run dev
```

## Usage

### Interactive CLI Mode

When you run the chatbot in interactive mode, you can:

- Ask questions about Mule best practices
- Request code analysis for specific files
- Get performance and security recommendations
- Learn about error handling patterns

Example commands:
```
analyze src/main/mule/my-flow.xml
best practices
performance tips
security guidelines
error handling patterns
connector updates
check updates http
security alerts
```

### Web Interface

The web interface provides:
- Real-time chat with the bot
- Project analysis with visual results
- File upload for analysis
- Best practices browser
- Conversation history
- Connector update checking with quick action buttons
- Security alerts dashboard
- Individual connector update reports

### REST API

#### Chat with the bot
```bash
POST /api/chat
Content-Type: application/json

{
  "message": "How do I optimize DataWeave transformations?",
  "sessionId": "user123"
}
```

#### Analyze a project
```bash
POST /api/analyze
Content-Type: application/json

{
  "projectPath": "/path/to/mule/project"
}
```

#### Analyze a single file
```bash
POST /api/analyze-file
Content-Type: application/json

{
  "filePath": "/path/to/mule/file.xml"
}
```

#### Get best practices
```bash
GET /api/best-practices
```

#### Get performance tips
```bash
GET /api/performance-tips
```

#### Get security guidelines
```bash
GET /api/security-guidelines
```

#### Check connector updates
```bash
GET /api/connector-updates
```

#### Check specific connector updates
```bash
GET /api/connector-updates/:connectorName
```

#### Get security alerts
```bash
GET /api/security-alerts
```

## Supported Mule Components

The chatbot can analyze and provide guidance for:

### Core Components
- Flows and sub-flows
- Private flows
- Error handlers
- Try scopes
- Choice routers
- Foreach loops
- Async processors

### Connectors
- HTTP/HTTPS connectors
- Database connectors
- File/FTP connectors
- JMS connectors
- Salesforce connectors
- And more...

### Configurations
- Global configurations
- Secure properties
- TLS contexts
- Connection pooling

### DataWeave
- Transformations
- Mapping patterns
- Performance optimization
- Best practices

## Configuration

The chatbot can be configured through environment variables:

```bash
# Port for web server (default: 3000)
PORT=3000

# Log level (default: info)
LOG_LEVEL=info

# Node environment
NODE_ENV=production
```

## Development

### Project Structure
```
mule-code-review-chatbot/
├── src/
│   ├── analyzers/          # Mule code analysis engine
│   │   └── MuleAnalyzer.js
│   ├── chatbot/            # Core chatbot implementation
│   │   ├── MuleCodeReviewChatbot.js
│   │   ├── ConnectorUpdateChecker.js  # NEW: Connector update management
│   │   └── WebServer.js
│   ├── nlp/                # Natural language processing
│   │   └── NLPProcessor.js
│   ├── rules/              # Code review rules engine
│   │   └── RulesEngine.js
│   └── index.js            # Main CLI entry point
├── config/                 # Configuration files
├── examples/               # Example Mule projects
├── tests/                  # Unit tests
├── public/                 # Web interface files
└── docs/                   # Documentation
```

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
npm run lint:fix
```

## Code Analysis Capabilities

### Flow Analysis
- Naming convention validation
- Complexity analysis
- Error handling coverage
- Documentation presence
- Performance patterns

### Configuration Review
- Global configuration naming
- Security best practices
- Connection pooling setup
- Timeout configurations

### Performance Analysis
- Memory usage patterns
- Connection efficiency
- Transformation optimization
- Async processing usage

### Security Review
- Credential management
- HTTPS usage
- Input validation
- Error message sanitization
- Connector security vulnerabilities
- Deprecated connector identification

## Best Practices Covered

### Naming Conventions
- Flow names should use kebab-case
- Configurations should have meaningful names
- Variables should be descriptive

### Error Handling
- Every flow should have error handlers
- Use appropriate error handling strategies
- Implement proper logging

### Performance
- Use streaming for large data
- Implement connection pooling
- Use async processing appropriately
- Enable caching where beneficial

### Security
- Use secure properties for credentials
- Implement HTTPS for external calls
- Validate all input data
- Follow authentication best practices
- Keep connectors updated with latest security patches
- Monitor for security alerts and vulnerabilities

## API Reference

### Chat API

#### POST /api/chat
Process a chat message and get a response from the bot.

**Request:**
```json
{
  "message": "string (required) - The message to send to the bot",
  "sessionId": "string (optional) - Session identifier for conversation tracking"
}
```

**Response:**
```json
{
  "response": "string - Bot's response",
  "sessionId": "string - Session identifier",
  "timestamp": "string - ISO timestamp"
}
```

### Analysis API

#### POST /api/analyze
Analyze a complete Mule project.

**Request:**
```json
{
  "projectPath": "string (required) - Path to the Mule project directory"
}
```

**Response:**
```json
{
  "analysis": {
    "projectPath": "string",
    "files": "array - Analyzed files",
    "flows": "array - Found flows",
    "configurations": "array - Found configurations",
    "issues": "array - Identified issues",
    "metrics": "object - Analysis metrics",
    "summary": "string - Analysis summary"
  },
  "timestamp": "string"
}
```

#### POST /api/analyze-file
Analyze a single Mule configuration file.

**Request:**
```json
{
  "filePath": "string (required) - Path to the Mule XML file"
}
```

**Response:**
```json
{
  "analysis": {
    "filePath": "string",
    "flows": "array - Found flows",
    "configurations": "array - Found configurations",
    "issues": "array - Identified issues",
    "metrics": "object - File metrics"
  },
  "timestamp": "string"
}
```

### Information APIs

#### GET /api/best-practices
Get all best practices recommendations.

#### GET /api/performance-tips
Get performance optimization tips.

#### GET /api/security-guidelines
Get security guidelines and recommendations.

#### GET /api/error-handling-patterns
Get error handling patterns and examples.

#### GET /api/connector-updates
Get all connector update information.

#### GET /api/connector-updates/:connectorName
Get update information for a specific connector.

#### GET /api/security-alerts
Get security alerts and deprecation warnings for connectors.

### Conversation APIs

#### GET /api/conversation/:sessionId?
Get conversation history for a session.

#### DELETE /api/conversation/:sessionId?
Clear conversation history for a session.

## WebSocket Events

### Client to Server
- `join-session` - Join a conversation session
- `chat-message` - Send a chat message
- `analyze-project` - Request project analysis
- `get-best-practices` - Request best practices
- `check-connector-updates` - Request connector update check

### Server to Client
- `session-joined` - Confirmation of session join
- `chat-response` - Response to chat message
- `chat-broadcast` - Broadcast message to session
- `analysis-started` - Analysis has begun
- `analysis-complete` - Analysis results
- `analysis-error` - Analysis failed
- `best-practices` - Best practices data
- `connector-updates` - Connector update information
- `security-alerts` - Security alerts and warnings
- `error` - General error message

## Troubleshooting

### Common Issues

#### "Failed to analyze project"
- Ensure the project path exists and contains Mule configuration files
- Check that XML files are valid and well-formed
- Verify file permissions

#### "No flows found"
- Make sure you're pointing to a valid Mule project directory
- Check that XML files contain Mule namespace declarations
- Verify files have .xml extension

#### "WebSocket connection failed"
- Check that the server is running
- Verify the port is not blocked by firewall
- Try using HTTP API instead

### Debug Mode
Set the LOG_LEVEL environment variable to 'debug' for more detailed logging:
```bash
LOG_LEVEL=debug npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run tests and linting
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions, issues, or contributions:
- Create an issue on the repository
- Check the documentation
- Review existing issues and discussions

## Changelog

### Version 1.1.0 - Connector Update Management
- ✨ Added connector update checking functionality
- 🔒 Added security alerts monitoring for connectors
- ⚠️ Added deprecation warnings and migration guidance
- 🌐 Enhanced web interface with connector update buttons
- 📊 Added connector update reporting and analytics
- 🚨 Real-time security vulnerability notifications
- 🔄 Automatic compatibility checking with Mule runtime versions

### Version 1.0.0
- Initial release
- Core chatbot functionality
- Mule code analysis engine
- Web interface
- REST API
- WebSocket support
- Best practices database
- Performance analysis
- Security guidelines
- Error handling patterns