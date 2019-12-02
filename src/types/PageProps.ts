export interface PageProps {
  location: {
    pathname: string
    search: string
    hash: string
  }
}
export interface PagePropsWithData extends PageProps {
  data: any
}
