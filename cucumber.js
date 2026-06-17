module.exports = {
  default: {
    timeout: 30000, // Aumenta o timeout para 30 segundos
    paths: ['features/**/*.feature'],
    require: ['steps/**/*.steps.js', 'support/**/*.js'],
    format: ['json:reports/cucumber-report.json']
  }
};
