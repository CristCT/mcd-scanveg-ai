/**
 * Formats a disease name from the model prediction
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
 * Formats a day name from a number
 */
export const formatDayName = (dayNumber: number | undefined | null): string => {
  if (dayNumber === undefined || dayNumber === null) {
    return 'N/A';
  }

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  return dayNames[dayNumber] || dayNumber.toString();
};

/**
 * Translates the status of an analysis
 */
export const translateStatus = (status: string): string => {
  return status === 'healthy' ? 'Saludable' : 'Enferma';
};

/**
 * Gets the color for the confidence indicator
 */
export const getConfianzaColor = (confianza: number): string => {
  if (confianza >= 90) return 'green';
  if (confianza >= 80) return 'yellow';
  return 'red';
};

/**
 * Formats a date string safely to avoid Invalid Date errors
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
