import { clsx, type ClassValue } from "clsx"
import moment from "moment"
import { twMerge } from "tailwind-merge"

export const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(1), time)
  })
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

/* EXAMPLE
<Link
	href={href}
	className={cn( // 👈🏻 Utils function takes 3 arguments (twMerge and clsx)
		'link no-underline opacity-70 hover:opacity-100', // 👈🏻 Merge with twMerge
		className, // 👈🏻 Incoming props applied by twMerge
		{ 'opacity-100': currentPath === href } // 👈🏻 Conditional logic applied by clsx
	)}
>
	{label}
</Link>
*/

export const lastSeen = (time: Date) => {
  return moment(time, "YYYY-MM-DD HH:mm:ss").fromNow()
}

let currentSortOrder = "asc"
export const toggleSortOrder = () => {
  currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc"
  console.log(currentSortOrder)
  return currentSortOrder
}
