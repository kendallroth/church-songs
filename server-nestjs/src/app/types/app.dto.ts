/** API information */
export class ApiInfoResponse {
  /**
   * API release date
   *
   * @example "2022-Jan-01 01:00"
   */
  releaseDate?: string;
  /** API Git release hash */
  releaseHash?: string;
  /**
   * API semantic version number
   *
   * @example "0.1.0"
   */
  version!: string;
}
