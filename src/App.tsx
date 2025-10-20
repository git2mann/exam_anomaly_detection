import { useState } from 'react';
import { StudentData, PredictionResult, StudentInfo } from './types';
import { supabase } from './supabase';
import PredictionForm from './components/PredictionForm';
import ResultDisplay from './components/ResultDisplay';
import './App.css';

function App() {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (studentInfo: StudentInfo, studentData: StudentData) => {
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/predict-anomaly`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const result: PredictionResult = await response.json();
      setPrediction(result);

      const { data: studentRecord } = await supabase
        .from('students')
        .select('id')
        .eq('student_id', studentInfo.student_id)
        .maybeSingle();

      let studentUuid = studentRecord?.id;

      if (!studentUuid) {
        const { data: newStudent, error: studentError } = await supabase
          .from('students')
          .insert({
            student_id: studentInfo.student_id,
            gender: studentInfo.gender,
            program: studentInfo.program,
            year: studentInfo.year,
          })
          .select()
          .single();

        if (studentError) throw studentError;
        studentUuid = newStudent.id;
      }

      await supabase.from('exam_submissions').insert({
        student_id: studentUuid,
        semester: studentInfo.semester,
        courses_enrolled: studentData.courses_enrolled,
        exam_data: studentData,
        anomaly_probability: result.anomaly_probability,
        flagged_as_cheating: result.flagged_as_cheating,
        risk_level: result.risk_level,
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>Exam Anomaly Detection System</h1>
          <p>Detect anomalous student exam performance patterns</p>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <PredictionForm onSubmit={handlePredict} loading={loading} />

          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}

          {prediction && <ResultDisplay result={prediction} />}
        </div>
      </main>
    </div>
  );
}

export default App;
