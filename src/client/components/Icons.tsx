type Props = {
  name: string;
  class?: string;
}

export const Icon = (props: Props) => {
  return <img src={`/icons/${props.name}.svg`} class={props.class} />
}