import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(1), time);
  });

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
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
