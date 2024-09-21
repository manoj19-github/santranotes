interface DataContentTypes {
  id: string;
  type: string;
  props: Props;
  content: Content[];
  children: any[];
}

interface Content {
  type: string;
  text: string;
  styles: Styles;
}

interface Styles {
  bold: boolean;
  textColor: string;
}

interface Props {
  textColor: string;
  backgroundColor: string;
  textAlignment: string;
  level: number;
}
