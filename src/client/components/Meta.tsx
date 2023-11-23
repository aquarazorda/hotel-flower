import { Meta, Title } from "@solidjs/meta";

type Props = {
  title: string;
  description?: string;
  url: string;
  imgUrl: string;
};

export default function MetaData(props: Props) {
  return (
    <>
      <Title>{props.title}</Title>
      <Meta name="description" content={props.description} />
      <Meta itemprop="name" content={props.title} />
      <Meta itemprop="description" content={props.description} />
      <Meta
        itemprop="image"
        content={`https://flowertbilisi.com/img/${props.imgUrl}`}
      />
      <Meta
        property="og:url"
        content={`https://www.flowertbilisi.com/${props.url}`}
      />
      <Meta property="og:type" content="website" />
      <Meta property="og:title" content={props.title} />
      <Meta property="og:description" content={props.description} />
      <Meta
        property="og:image"
        content={`https://flowertbilisi.com/img/${props.imgUrl}`}
      />

      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={props.title} />
      <Meta name="twitter:description" content={props.description} />
      <Meta
        name="twitter:image"
        content={`https://flowertbilisi.com/img/${props.imgUrl}`}
      />
    </>
  );
}
