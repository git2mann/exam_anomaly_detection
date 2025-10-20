import { useState } from 'react';
import { StudentData, StudentInfo } from '../types';
import './PredictionForm.css';

interface Props {
  onSubmit: (studentInfo: StudentInfo, data: StudentData) => void;
  loading: boolean;
}

const PredictionForm = ({ onSubmit, loading }: Props) => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    student_id: '',
    gender: 'M',
    program: 'Computer Science',
    year: 2,
    semester: 'Spring 2025',
  });

  const [formData, setFormData] = useState<StudentData>({
    year: 2,
    courses_enrolled: 10,
    hist_MATH101_coursework: 50,
    hist_MATH101_exam: 50,
    hist_MATH101_final: 50,
    hist_MATH101_grade_point: 2,
    hist_CS101_coursework: 50,
    hist_CS101_exam: 50,
    hist_CS101_final: 50,
    hist_CS101_grade_point: 2,
    hist_STAT101_coursework: 50,
    hist_STAT101_exam: 50,
    hist_STAT101_final: 50,
    hist_STAT101_grade_point: 2,
    hist_ECON101_coursework: 50,
    hist_ECON101_exam: 50,
    hist_ECON101_final: 50,
    hist_ECON101_grade_point: 2,
    hist_MATH201_coursework: 50,
    hist_MATH201_exam: 50,
    hist_MATH201_final: 50,
    hist_MATH201_grade_point: 2,
    hist_CS120_coursework: 50,
    hist_CS120_exam: 50,
    hist_CS120_final: 50,
    hist_CS120_grade_point: 2,
    MATH301_coursework_avg: 50,
    MATH301_final_exam: 50,
    MATH301_exam_coursework_diff: 0,
    MATH301_dept_improvement: 0,
    MATH301_dept_gpa_improvement: 0,
    MATH301_historical_improvement: 0,
    MATH301_gpa_improvement: 0,
    STAT240_coursework_avg: 50,
    STAT240_final_exam: 50,
    STAT240_exam_coursework_diff: 0,
    STAT240_dept_improvement: 0,
    STAT240_dept_gpa_improvement: 0,
    STAT240_historical_improvement: 0,
    STAT240_gpa_improvement: 0,
    CS220_coursework_avg: 50,
    CS220_final_exam: 50,
    CS220_exam_coursework_diff: 0,
    CS220_dept_improvement: 0,
    CS220_dept_gpa_improvement: 0,
    CS220_historical_improvement: 0,
    CS220_gpa_improvement: 0,
    ECON210_coursework_avg: 50,
    ECON210_final_exam: 50,
    ECON210_exam_coursework_diff: 0,
    ECON210_dept_improvement: 0,
    ECON210_dept_gpa_improvement: 0,
    ECON210_historical_improvement: 0,
    ECON210_gpa_improvement: 0,
    DS350_coursework_avg: 50,
    DS350_final_exam: 50,
    DS350_exam_coursework_diff: 0,
    DS350_historical_improvement: 0,
    DS350_gpa_improvement: 0,
    CS340_coursework_avg: 50,
    CS340_final_exam: 50,
    CS340_exam_coursework_diff: 0,
    CS340_dept_improvement: 0,
    CS340_dept_gpa_improvement: 0,
    CS340_historical_improvement: 0,
    CS340_gpa_improvement: 0,
    MATH330_coursework_avg: 50,
    MATH330_final_exam: 50,
    MATH330_exam_coursework_diff: 0,
    MATH330_dept_improvement: 0,
    MATH330_dept_gpa_improvement: 0,
    MATH330_historical_improvement: 0,
    MATH330_gpa_improvement: 0,
    STAT330_coursework_avg: 50,
    STAT330_final_exam: 50,
    STAT330_exam_coursework_diff: 0,
    STAT330_dept_improvement: 0,
    STAT330_dept_gpa_improvement: 0,
    STAT330_historical_improvement: 0,
    STAT330_gpa_improvement: 0,
    ECON315_coursework_avg: 50,
    ECON315_final_exam: 50,
    ECON315_exam_coursework_diff: 0,
    ECON315_dept_improvement: 0,
    ECON315_dept_gpa_improvement: 0,
    ECON315_historical_improvement: 0,
    ECON315_gpa_improvement: 0,
    FIN300_coursework_avg: 50,
    FIN300_final_exam: 50,
    FIN300_exam_coursework_diff: 0,
    FIN300_historical_improvement: 0,
    FIN300_gpa_improvement: 0,
    semester_gpa: 2.5,
    suspicious_improvements_count: 0,
    semester_gpa_improvement: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(studentInfo, formData);
  };

  const handleStudentInfoChange = (field: keyof StudentInfo, value: string | number) => {
    setStudentInfo(prev => ({ ...prev, [field]: value }));
    if (field === 'year') {
      setFormData(prev => ({ ...prev, year: Number(value) }));
    }
  };

  const handleInputChange = (field: keyof StudentData, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuickFill = (scenario: 'normal' | 'suspicious') => {
    if (scenario === 'normal') {
      setStudentInfo({
        student_id: '20230001',
        gender: 'F',
        program: 'Computer Science',
        year: 2,
        semester: 'Spring 2025',
      });
      setFormData({
        ...formData,
        year: 2,
        courses_enrolled: 10,
        hist_MATH101_coursework: 55,
        hist_MATH101_exam: 52,
        MATH301_coursework_avg: 58,
        MATH301_final_exam: 60,
        MATH301_exam_coursework_diff: 2,
        MATH301_historical_improvement: 5,
        STAT240_coursework_avg: 62,
        STAT240_final_exam: 64,
        STAT240_exam_coursework_diff: 2,
        semester_gpa: 2.8,
        suspicious_improvements_count: 0,
        semester_gpa_improvement: 0.3,
      });
    } else {
      setStudentInfo({
        student_id: '20230999',
        gender: 'M',
        program: 'Data Science',
        year: 3,
        semester: 'Spring 2025',
      });
      setFormData({
        ...formData,
        year: 3,
        courses_enrolled: 10,
        hist_MATH101_coursework: 45,
        hist_MATH101_exam: 42,
        MATH301_coursework_avg: 48,
        MATH301_final_exam: 85,
        MATH301_exam_coursework_diff: 37,
        MATH301_historical_improvement: 40,
        STAT240_coursework_avg: 50,
        STAT240_final_exam: 88,
        STAT240_exam_coursework_diff: 38,
        STAT240_historical_improvement: 38,
        CS220_coursework_avg: 47,
        CS220_final_exam: 82,
        CS220_exam_coursework_diff: 35,
        semester_gpa: 3.8,
        suspicious_improvements_count: 5,
        semester_gpa_improvement: 1.8,
      });
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Student Exam Data</h2>
        <p>Enter student information and exam performance data</p>
        <div className="quick-fill">
          <button type="button" onClick={() => handleQuickFill('normal')} className="btn-secondary">
            Fill Normal Example
          </button>
          <button type="button" onClick={() => handleQuickFill('suspicious')} className="btn-secondary">
            Fill Suspicious Example
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Student Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Student ID</label>
              <input
                type="text"
                value={studentInfo.student_id}
                onChange={(e) => handleStudentInfoChange('student_id', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                value={studentInfo.gender}
                onChange={(e) => handleStudentInfoChange('gender', e.target.value)}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label>Program</label>
              <select
                value={studentInfo.program}
                onChange={(e) => handleStudentInfoChange('program', e.target.value)}
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Data Science">Data Science</option>
                <option value="Statistics">Statistics</option>
                <option value="Economics">Economics</option>
                <option value="Applied Mathematics">Applied Mathematics</option>
              </select>
            </div>
            <div className="form-group">
              <label>Year</label>
              <input
                type="number"
                min="1"
                max="4"
                value={studentInfo.year}
                onChange={(e) => handleStudentInfoChange('year', parseInt(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label>Semester</label>
              <input
                type="text"
                value={studentInfo.semester}
                onChange={(e) => handleStudentInfoChange('semester', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Courses Enrolled</label>
              <input
                type="number"
                min="1"
                value={formData.courses_enrolled}
                onChange={(e) => handleInputChange('courses_enrolled', parseFloat(e.target.value))}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Key Performance Indicators</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Semester GPA</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="4"
                value={formData.semester_gpa}
                onChange={(e) => handleInputChange('semester_gpa', parseFloat(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label>Semester GPA Improvement</label>
              <input
                type="number"
                step="0.1"
                value={formData.semester_gpa_improvement}
                onChange={(e) => handleInputChange('semester_gpa_improvement', parseFloat(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label>Suspicious Improvements Count</label>
              <input
                type="number"
                min="0"
                value={formData.suspicious_improvements_count}
                onChange={(e) => handleInputChange('suspicious_improvements_count', parseFloat(e.target.value))}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>MATH301 Current Performance</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Coursework Average</label>
              <input
                type="number"
                step="0.1"
                value={formData.MATH301_coursework_avg}
                onChange={(e) => handleInputChange('MATH301_coursework_avg', parseFloat(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label>Final Exam Score</label>
              <input
                type="number"
                step="0.1"
                value={formData.MATH301_final_exam}
                onChange={(e) => handleInputChange('MATH301_final_exam', parseFloat(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label>Exam-Coursework Difference</label>
              <input
                type="number"
                step="0.1"
                value={formData.MATH301_exam_coursework_diff}
                onChange={(e) => handleInputChange('MATH301_exam_coursework_diff', parseFloat(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label>Historical Improvement</label>
              <input
                type="number"
                step="0.1"
                value={formData.MATH301_historical_improvement}
                onChange={(e) => handleInputChange('MATH301_historical_improvement', parseFloat(e.target.value))}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>STAT240 Current Performance</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Coursework Average</label>
              <input
                type="number"
                step="0.1"
                value={formData.STAT240_coursework_avg}
                onChange={(e) => handleInputChange('STAT240_coursework_avg', parseFloat(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label>Final Exam Score</label>
              <input
                type="number"
                step="0.1"
                value={formData.STAT240_final_exam}
                onChange={(e) => handleInputChange('STAT240_final_exam', parseFloat(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label>Exam-Coursework Difference</label>
              <input
                type="number"
                step="0.1"
                value={formData.STAT240_exam_coursework_diff}
                onChange={(e) => handleInputChange('STAT240_exam_coursework_diff', parseFloat(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label>Historical Improvement</label>
              <input
                type="number"
                step="0.1"
                value={formData.STAT240_historical_improvement}
                onChange={(e) => handleInputChange('STAT240_historical_improvement', parseFloat(e.target.value))}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>CS220 Current Performance</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Coursework Average</label>
              <input
                type="number"
                step="0.1"
                value={formData.CS220_coursework_avg}
                onChange={(e) => handleInputChange('CS220_coursework_avg', parseFloat(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label>Final Exam Score</label>
              <input
                type="number"
                step="0.1"
                value={formData.CS220_final_exam}
                onChange={(e) => handleInputChange('CS220_final_exam', parseFloat(e.target.value))}
                required
              />
            </div>
            <div className="form-group">
              <label>Exam-Coursework Difference</label>
              <input
                type="number"
                step="0.1"
                value={formData.CS220_exam_coursework_diff}
                onChange={(e) => handleInputChange('CS220_exam_coursework_diff', parseFloat(e.target.value))}
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Analyzing...' : 'Predict Anomaly Risk'}
        </button>
      </form>
    </div>
  );
};

export default PredictionForm;
