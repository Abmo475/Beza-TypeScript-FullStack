import http from "../http-common";
import RecordData from "../types/record.types"

class DataService {
  getAll() {
    return http.get<Array<any>>("api/v1/getall");
  }
  create(file:File) {
    let data=new FormData();
    data.append("file",file)
    return http.post<FormData>("/v1/upload", file);
  }
  get(id: string) {
    return http.get<RecordData>(`/tutorials/${id}`);
  }


  update(data: RecordData, id: any) {
    return http.put<any>(`/tutorials/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`api/v1/delete/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/tutorials`);
  }

  findByTitle(title: string) {
    return http.get<Array<RecordData>>(`/tutorials?title=${title}`);
  }
}
let Data=new DataService();
export default Data