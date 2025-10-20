import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface StudentData {
  year: number;
  courses_enrolled: number;
  hist_MATH101_coursework: number;
  hist_MATH101_exam: number;
  hist_MATH101_final: number;
  hist_MATH101_grade_point: number;
  hist_CS101_coursework: number;
  hist_CS101_exam: number;
  hist_CS101_final: number;
  hist_CS101_grade_point: number;
  hist_STAT101_coursework: number;
  hist_STAT101_exam: number;
  hist_STAT101_final: number;
  hist_STAT101_grade_point: number;
  hist_ECON101_coursework: number;
  hist_ECON101_exam: number;
  hist_ECON101_final: number;
  hist_ECON101_grade_point: number;
  hist_MATH201_coursework: number;
  hist_MATH201_exam: number;
  hist_MATH201_final: number;
  hist_MATH201_grade_point: number;
  hist_CS120_coursework: number;
  hist_CS120_exam: number;
  hist_CS120_final: number;
  hist_CS120_grade_point: number;
  MATH301_coursework_avg: number;
  MATH301_final_exam: number;
  MATH301_exam_coursework_diff: number;
  MATH301_dept_improvement: number;
  MATH301_dept_gpa_improvement: number;
  MATH301_historical_improvement: number;
  MATH301_gpa_improvement: number;
  STAT240_coursework_avg: number;
  STAT240_final_exam: number;
  STAT240_exam_coursework_diff: number;
  STAT240_dept_improvement: number;
  STAT240_dept_gpa_improvement: number;
  STAT240_historical_improvement: number;
  STAT240_gpa_improvement: number;
  CS220_coursework_avg: number;
  CS220_final_exam: number;
  CS220_exam_coursework_diff: number;
  CS220_dept_improvement: number;
  CS220_dept_gpa_improvement: number;
  CS220_historical_improvement: number;
  CS220_gpa_improvement: number;
  ECON210_coursework_avg: number;
  ECON210_final_exam: number;
  ECON210_exam_coursework_diff: number;
  ECON210_dept_improvement: number;
  ECON210_dept_gpa_improvement: number;
  ECON210_historical_improvement: number;
  ECON210_gpa_improvement: number;
  DS350_coursework_avg: number;
  DS350_final_exam: number;
  DS350_exam_coursework_diff: number;
  DS350_historical_improvement: number;
  DS350_gpa_improvement: number;
  CS340_coursework_avg: number;
  CS340_final_exam: number;
  CS340_exam_coursework_diff: number;
  CS340_dept_improvement: number;
  CS340_dept_gpa_improvement: number;
  CS340_historical_improvement: number;
  CS340_gpa_improvement: number;
  MATH330_coursework_avg: number;
  MATH330_final_exam: number;
  MATH330_exam_coursework_diff: number;
  MATH330_dept_improvement: number;
  MATH330_dept_gpa_improvement: number;
  MATH330_historical_improvement: number;
  MATH330_gpa_improvement: number;
  STAT330_coursework_avg: number;
  STAT330_final_exam: number;
  STAT330_exam_coursework_diff: number;
  STAT330_dept_improvement: number;
  STAT330_dept_gpa_improvement: number;
  STAT330_historical_improvement: number;
  STAT330_gpa_improvement: number;
  ECON315_coursework_avg: number;
  ECON315_final_exam: number;
  ECON315_exam_coursework_diff: number;
  ECON315_dept_improvement: number;
  ECON315_dept_gpa_improvement: number;
  ECON315_historical_improvement: number;
  ECON315_gpa_improvement: number;
  FIN300_coursework_avg: number;
  FIN300_final_exam: number;
  FIN300_exam_coursework_diff: number;
  FIN300_historical_improvement: number;
  FIN300_gpa_improvement: number;
  semester_gpa: number;
  suspicious_improvements_count: number;
  semester_gpa_improvement: number;
}

function calculateAnomalyScore(data: StudentData): number {
  let score = 0;
  let factors = 0;

  const examCourseworkDiffs = [
    data.MATH301_exam_coursework_diff,
    data.STAT240_exam_coursework_diff,
    data.CS220_exam_coursework_diff,
    data.ECON210_exam_coursework_diff,
    data.DS350_exam_coursework_diff,
    data.CS340_exam_coursework_diff,
    data.MATH330_exam_coursework_diff,
    data.STAT330_exam_coursework_diff,
    data.ECON315_exam_coursework_diff,
    data.FIN300_exam_coursework_diff
  ];

  const largeDiffs = examCourseworkDiffs.filter(diff => diff > 10).length;
  score += largeDiffs * 15;
  factors++;

  if (data.suspicious_improvements_count >= 3) {
    score += data.suspicious_improvements_count * 20;
    factors++;
  }

  if (data.semester_gpa_improvement > 1.0) {
    score += data.semester_gpa_improvement * 25;
    factors++;
  }

  const avgHistImprovement = (
    data.MATH301_historical_improvement +
    data.STAT240_historical_improvement +
    data.CS220_historical_improvement +
    data.ECON210_historical_improvement +
    data.DS350_historical_improvement +
    data.CS340_historical_improvement +
    data.MATH330_historical_improvement +
    data.STAT330_historical_improvement +
    data.ECON315_historical_improvement +
    data.FIN300_historical_improvement
  ) / 10;

  if (avgHistImprovement > 15) {
    score += avgHistImprovement * 2;
    factors++;
  }

  return Math.min(score / Math.max(factors, 1), 100);
}

function getRiskLevel(probability: number): string {
  if (probability >= 0.75) return "Critical";
  if (probability >= 0.5) return "High";
  if (probability >= 0.25) return "Medium";
  return "Low";
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const studentData: StudentData = await req.json();

    const anomalyScore = calculateAnomalyScore(studentData);
    const anomalyProbability = anomalyScore / 100;
    const flagged = anomalyProbability >= 0.5;
    const riskLevel = getRiskLevel(anomalyProbability);

    const response = {
      anomaly_probability: anomalyProbability,
      flagged_as_cheating: flagged,
      risk_level: riskLevel,
      anomaly_score: anomalyScore
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});