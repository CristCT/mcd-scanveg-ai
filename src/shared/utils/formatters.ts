/**
 * Formats a disease name from the model prediction to a user-friendly Spanish name
 * @param prediction - The raw prediction string from the ML model
 * @returns Formatted disease name in Spanish or 'N/A' if prediction is invalid
 */
export const formatDiseaseName = (
  prediction: string | undefined | null
): string => {
  if (!prediction) {
    return 'N/A';
  }

  const diseaseNames: Record<string, string> = {
    Tomato_healthy: 'Saludable',
    Tomato_Bacterial_spot: 'Mancha Bacteriana',
    Tomato_Early_blight: 'Tizón Temprano',
    Tomato_Late_blight: 'Tizón Tardío',
    Tomato_Leaf_Mold: 'Moho de Hoja',
    Tomato_Septoria_leaf_spot: 'Mancha de Septoria',
    Tomato_Spider_mites_Two_spotted_spider_mite: 'Ácaros Araña',
    Tomato__Target_Spot: 'Mancha Objetivo',
    Tomato__Tomato_YellowLeaf__Curl_Virus: 'Virus del Rizado Amarillo',
    Tomato__Tomato_mosaic_virus: 'Virus del Mosaico',
  };

  return (
    diseaseNames[prediction] ||
    prediction.replace(/Tomato_/g, '').replace(/_/g, ' ')
  );
};

/**
 * Formats a day name from a number (0-6) to Spanish abbreviated day name
 * @param dayNumber - Day of week number (0=Sunday, 1=Monday, etc.)
 * @returns Spanish abbreviated day name or 'N/A' if invalid
 */
export const formatDayName = (dayNumber: number | undefined | null): string => {
  if (dayNumber === undefined || dayNumber === null) {
    return 'N/A';
  }

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  return dayNames[dayNumber] || dayNumber.toString();
};

/**
 * Translates the analysis status from English to Spanish
 * @param status - The status string ('healthy' or 'diseased')
 * @returns Spanish translation of the status
 */
export const translateStatus = (status: string): string => {
  return status === 'healthy' ? 'Saludable' : 'Enferma';
};

/**
 * Gets the color for the confidence indicator based on confidence percentage
 * @param confianza - Confidence percentage (0-100)
 * @returns Color string ('green', 'yellow', or 'red')
 */
export const getConfianzaColor = (confianza: number): string => {
  if (confianza >= 90) return 'green';
  if (confianza >= 80) return 'yellow';
  return 'red';
};

/**
 * Formats a date string safely to avoid Invalid Date errors
 * @param dateString - ISO date string to format
 * @returns Formatted date in Spanish locale or error message if invalid
 */
export const formatAnalysisDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return 'Fecha incorrecta';
    }

    return date.toLocaleDateString('es-ES');
  } catch {
    return 'Fecha incorrecta';
  }
};
