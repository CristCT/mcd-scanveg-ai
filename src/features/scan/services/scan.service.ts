import { httpService } from '../../../shared/services';
import type { ScanResultData, ScanRequest } from '../types';
import type { ApiResponse } from '../../../shared/types';

/**
 * Interface for the scan API response structure
 */
interface ScanResponse {
  success: boolean;
  message: string;
  data: {
    prediction: string;
    confidence: number;
    model_info: {
      model_used: boolean;
      available_classes: string[];
    };
    detailed_predictions: Record<string, number>;
  };
}

/**
 * Service class for handling image scanning operations
 */
class ScanService {
  /**
   * Scans an uploaded image for tomato diseases
   * @param request - The scan request containing the image file
   * @returns Promise resolving to scan result data or error
   */
  async scanImage(request: ScanRequest): Promise<ApiResponse<ScanResultData>> {
    const formData = new FormData();
    formData.append('image', request.image);

    try {
      const response = await httpService.postFormData<ScanResponse>(
        '/api/scan',
        formData
      );

      if (response.success && response.data) {
        const backendData = response.data.data;

        const transformedData: ScanResultData = {
          prediction:
            backendData.prediction === 'Tomato_healthy'
              ? 'healthy'
              : 'diseased',
          confidence: backendData.confidence / 100,
          disease:
            backendData.prediction !== 'Tomato_healthy'
              ? this.formatDiseaseName(backendData.prediction)
              : undefined,
          details: this.getDiseaseTreatment(backendData.prediction),
          processedAt: new Date().toISOString(),
        };

        return {
          success: true,
          data: transformedData,
        };
      } else {
        return {
          success: false,
          error: response.data?.message || 'Failed to process image',
        };
      }
    } catch {
      return {
        success: false,
        error: 'Connection error. Please try again.',
      };
    }
  }

  /**
   * Formats a disease prediction to a user-friendly Spanish name
   * @param prediction - Raw prediction string from the ML model
   * @returns Formatted disease name in Spanish
   */
  private formatDiseaseName(prediction: string): string {
    const diseaseNames: Record<string, string> = {
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
  }

  /**
   * Gets treatment recommendations for a specific disease
   * @param prediction - Disease prediction from the ML model
   * @returns Treatment recommendation in Spanish
   */
  private getDiseaseTreatment(prediction: string): string {
    const treatments: Record<string, string> = {
      Tomato_Bacterial_spot:
        'Aplicar fungicidas a base de cobre. Mejorar ventilación y evitar riego por aspersión.',
      Tomato_Early_blight:
        'Usar fungicidas preventivos. Rotar cultivos y eliminar restos vegetales.',
      Tomato_Late_blight:
        'Aplicar fungicidas sistémicos. Evitar humedad excesiva y mejorar drenaje.',
      Tomato_Leaf_Mold:
        'Mejorar ventilación del invernadero. Reducir humedad relativa.',
      Tomato_Septoria_leaf_spot:
        'Aplicar fungicidas y eliminar hojas afectadas. Evitar riego por aspersión.',
      Tomato_Spider_mites_Two_spotted_spider_mite:
        'Usar acaricidas específicos. Aumentar humedad ambiental.',
      Tomato__Target_Spot:
        'Aplicar fungicidas preventivos. Mejorar circulación de aire.',
      Tomato__Tomato_YellowLeaf__Curl_Virus:
        'Controlar insectos vectores (mosca blanca). No hay cura directa.',
      Tomato__Tomato_mosaic_virus:
        'Eliminar plantas infectadas. Desinfectar herramientas.',
    };

    return (
      treatments[prediction] ||
      'No hay información disponible sobre este tratamiento.'
    );
  }
}

export const scanService = new ScanService();
