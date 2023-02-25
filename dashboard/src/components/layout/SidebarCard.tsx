import {Link} from "react-router-dom";

interface SidebarCardProps {
    to: string,
    icon: JSX.Element,
    name: string,
    isActive: boolean,
}
export const SidebarCard = (props: SidebarCardProps) => {
  return (
      <Link to={props.to} className={`flex gap-2 items-center px-4 py-2 font-medium text-lg rounded-md ${props.isActive ? 'text-black bg-gray-100' : 'text-gray-400'} hover:text-black hover:bg-gray-100`}>
          {props.icon}
          <span className={''}>{props.name}</span>
      </Link>
  )
}