import { MatrixPhoneType, MatrixBooleanStringType } from '../types/matrix-common.types';

export interface MatrixBaseDbRecordModelInterface {
    recordId: string;
    createdDateTime: string;
    lastModifiedDateTime: string;
    isDeleted?: boolean;
}

export interface MatrixUserInterface {
    authenticatedUserName: string; // example "Vishwa Muneeswaran"
    isAuthenticated: MatrixBooleanStringType; // "true" or "false"
    token: string; // jwt token string
}

export interface MatrixAddressModelInterface extends MatrixBaseAddressModelInterface {
    landmarks: MatrixLandMarkModelInterface[];
    isPrimary: boolean;
}

export interface MatrixLandMarkModelInterface extends MatrixBaseAddressModelInterface {
    landMarkName: string;
}

export interface MatrixBaseAddressModelInterface {
    doorNumber: string;
    street: string;
    area: string;
    village: string;
    town: string;
    city: string;
    zip: string;
}

export interface MatrixPhoneModelInterface {
    type: MatrixPhoneType;
    phoneNumber: number;
    isPrimary: boolean;
}

