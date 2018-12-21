import { MatrixPhoneType, MatrixBooleanStringType } from './types/matrix-common.types';
import {
    MatrixPhoneModelInterface,
    MatrixBaseAddressModelInterface,
    MatrixLandMarkModelInterface,
    MatrixAddressModelInterface,
    MatrixUserInterface,
    MatrixBaseDbRecordModelInterface
} from './interfaces/matrix-common-models.interface';

export class MatrixBaseResponseModel implements MatrixBaseDbRecordModelInterface {
    recordId: string;
    createdDateTime: string;
    lastModifiedDateTime: string;
    isDeleted?: boolean;
}

export class MatrixUser implements MatrixUserInterface {
    authenticatedUserName: string; // example "Vishwa Muneeswaran"
    isAuthenticated: MatrixBooleanStringType; // "true" or "false"
    token: string; // jwt token string
}

export class MatrixBaseAddressModel implements MatrixBaseAddressModelInterface {
    doorNumber: string;
    street: string;
    area: string;
    village: string;
    town: string;
    city: string;
    zip: string;
}

export class MatrixPhoneModel implements MatrixPhoneModelInterface {
    type: MatrixPhoneType;
    phoneNumber: number;
    isPrimary: boolean;
}

export class MatrixAddressModel extends MatrixBaseAddressModel implements MatrixAddressModelInterface {
    landmarks: MatrixLandMarkModel[];
    isPrimary: boolean;
}

export class MatrixLandMarkModel extends MatrixBaseAddressModel implements MatrixLandMarkModelInterface {
    landMarkName: string;
}





