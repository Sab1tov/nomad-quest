import Image from 'next/image'

export default function Congratulations() {
	return (
		<div className='flex min-h-screen items-center justify-center bg-[#08090b] overflow-hidden'>
			<main className='flex flex-col items-center justify-center w-full min-h-screen p-2 sm:p-4 md:p-6'>
				<div className='relative w-full h-full flex items-center justify-center'>
					<Image
						src='/congratulations.jpg'
						alt='Congratulations'
						width={1920}
						height={1080}
						className='w-full h-auto max-w-full max-h-screen object-contain'
						priority
						sizes='100vw'
					/>
				</div>
			</main>
		</div>
	)
}
