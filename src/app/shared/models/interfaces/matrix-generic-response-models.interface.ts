import { MatrixGenericResponseStatusType } from '../types/matrix-common.types';

export interface MatrixGenericResponseModelInterface {
    status: MatrixGenericResponseStatusType;
    errorMessage: string;
    displayMessage: string;
}




