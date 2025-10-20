import { PredictionResult } from '../types';
import './ResultDisplay.css';

interface Props {
  result: PredictionResult;
}

const ResultDisplay = ({ result }: Props) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical':
        return '#c53030';
      case 'High':
        return '#dd6b20';
      case 'Medium':
        return '#d69e2e';
      case 'Low':
        return '#38a169';
      default:
        return '#718096';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'Critical':
        return '⚠️';
      case 'High':
        return '⚡';
      case 'Medium':
        return '⚠';
      case 'Low':
        return '✓';
      default:
        return '•';
    }
  };

  const getRiskDescription = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'Immediate investigation required. Multiple strong indicators of anomalous behavior detected.';
      case 'High':
        return 'High probability of anomalous behavior. Further review recommended.';
      case 'Medium':
        return 'Moderate indicators present. Monitor student performance closely.';
      case 'Low':
        return 'Performance appears normal. No significant concerns detected.';
      default:
        return '';
    }
  };

  const probability = (result.anomaly_probability * 100).toFixed(1);

  return (
    <div className="result-container">
      <div className="result-header">
        <h2>Analysis Results</h2>
      </div>

      <div className="result-content">
        <div className="risk-badge" style={{ backgroundColor: getRiskColor(result.risk_level) }}>
          <span className="risk-icon">{getRiskIcon(result.risk_level)}</span>
          <span className="risk-text">{result.risk_level} Risk</span>
        </div>

        <div className="probability-meter">
          <div className="probability-label">
            <span>Anomaly Probability</span>
            <span className="probability-value">{probability}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${probability}%`,
                backgroundColor: getRiskColor(result.risk_level),
              }}
            />
          </div>
        </div>

        <div className="status-card">
          <div className="status-header">
            <span className="status-label">Detection Status</span>
            <span
              className={`status-badge ${result.flagged_as_cheating ? 'flagged' : 'clear'}`}
            >
              {result.flagged_as_cheating ? 'Flagged' : 'Clear'}
            </span>
          </div>
          <p className="status-description">{getRiskDescription(result.risk_level)}</p>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-label">Anomaly Score</div>
            <div className="metric-value">{result.anomaly_score.toFixed(2)}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Risk Classification</div>
            <div className="metric-value" style={{ color: getRiskColor(result.risk_level) }}>
              {result.risk_level}
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Confidence Level</div>
            <div className="metric-value">
              {result.anomaly_probability >= 0.75
                ? 'Very High'
                : result.anomaly_probability >= 0.5
                ? 'High'
                : result.anomaly_probability >= 0.25
                ? 'Moderate'
                : 'Low'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
