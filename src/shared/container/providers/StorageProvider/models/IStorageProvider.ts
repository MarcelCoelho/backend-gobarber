export default interface IStoragaProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
