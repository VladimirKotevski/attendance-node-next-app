import "mongoose";

declare module "mongoose" {
  interface Query<ResultType = any, DocType = any, THelpers = {}, RawDocType = DocType, DocType2 = DocType> {
    cache(options?: { key?: string }): this;
    useCache?: boolean;
    hashKey?: string;
  }
}