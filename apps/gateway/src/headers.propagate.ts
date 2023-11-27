import { RemoteGraphQLDataSource } from "@apollo/gateway";

export class ComposeDBDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    request.http.headers.set('ComposeDB-ViewerID', context.viewerID);
  }
}
