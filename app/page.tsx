'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
	const [answer, setAnswer] = useState('')
	const [attempts, setAttempts] = useState(0)
	const router = useRouter()

	// Загружаем значение из localStorage только на клиенте после монтирования
	useEffect(() => {
		const loadAttempts = () => {
			const savedAttempts = localStorage.getItem('attempts')
			if (savedAttempts) {
				setAttempts(parseInt(savedAttempts, 10))
			}
		}
		loadAttempts()
	}, [])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (answer.trim().toLowerCase() === 'name') {
			// Правильный ответ - переходим на страницу congratulations
			router.push('/congratulations')
		} else {
			// Неправильный ответ - увеличиваем счетчик
			const newAttempts = attempts + 1
			setAttempts(newAttempts)
			localStorage.setItem('attempts', newAttempts.toString())
			setAnswer('') // Очищаем поле ввода
		}
	}

	const handleEasterEgg = () => {
		const video = document.createElement('video')
		video.src = '/Пасхалка.mp4'
		video.style.width = '100vw'
		video.style.height = '100vh'
		video.style.objectFit = 'cover'
		video.style.position = 'fixed'
		video.style.top = '0'
		video.style.left = '0'
		video.style.zIndex = '99999'
		video.style.backgroundColor = '#000'
		video.controls = false
		video.autoplay = true
		video.muted = false

		document.body.appendChild(video)

		const enterFullscreen = () => {
			if (video.requestFullscreen) {
				video.requestFullscreen()
			} else {
				// Поддержка старых браузеров
				const videoElement = video as HTMLElement & {
					webkitRequestFullscreen?: () => void
					mozRequestFullScreen?: () => void
					msRequestFullscreen?: () => void
				}
				if (videoElement.webkitRequestFullscreen) {
					videoElement.webkitRequestFullscreen()
				} else if (videoElement.mozRequestFullScreen) {
					videoElement.mozRequestFullScreen()
				} else if (videoElement.msRequestFullscreen) {
					videoElement.msRequestFullscreen()
				}
			}
		}

		video.play().then(() => {
			enterFullscreen()
		})

		const cleanup = () => {
			document.body.removeChild(video)
			if (document.exitFullscreen) {
				document.exitFullscreen()
			} else {
				// Поддержка старых браузеров
				const doc = document as Document & {
					webkitExitFullscreen?: () => void
					mozCancelFullScreen?: () => void
					msExitFullscreen?: () => void
				}
				if (doc.webkitExitFullscreen) {
					doc.webkitExitFullscreen()
				} else if (doc.mozCancelFullScreen) {
					doc.mozCancelFullScreen()
				} else if (doc.msExitFullscreen) {
					doc.msExitFullscreen()
				}
			}
		}

		video.addEventListener('ended', cleanup)
		video.addEventListener('click', cleanup)
	}

	return (
		<div className='flex min-h-screen items-center justify-center bg-black font-sans relative'>
			<main className='flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 w-full max-w-4xl py-8'>
				<button
					onClick={handleEasterEgg}
					className='w-24 h-24 bg-black border-0 cursor-pointer mb-4'
					aria-label='Easter egg'
				/>
				<div className='text-center'>
					<h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 md:mb-8'>
						Finish this piece of code
						<br />
						And you will see Magic
					</h1>
				</div>

				<div className='bg-black p-4 sm:p-5 md:p-6 rounded-lg font-mono text-left w-full max-w-full overflow-x-auto'>
					<div className='text-white mb-2 text-sm sm:text-base'>
						<span className='text-white'>name</span>
						<span className='text-white'> = </span>
						<span className='text-yellow-400'>input</span>
						<span className='text-green-400'>
							(&quot;Insert your name: &quot;)
						</span>
					</div>
					<div className='text-white text-sm sm:text-base'>
						<span className='text-yellow-400'>print</span>
						<span className='text-green-400'>(&quot;Hello&quot;, </span>
						<span className='text-green-400 underline decoration-2 decoration-green-400'>
							_______
						</span>
						<span className='text-green-400'>)</span>
					</div>
				</div>

				<form onSubmit={handleSubmit} className='w-full max-w-md px-4'>
					<input
						type='text'
						value={answer}
						onChange={e => setAnswer(e.target.value)}
						placeholder='Enter your answer'
						className='w-full px-4 py-3 text-sm sm:text-base rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400'
						autoFocus
					/>
				</form>

				<div className='text-white text-xs sm:text-sm'>
					Attempts: <span className='font-bold'>{attempts}</span>
				</div>
			</main>
		</div>
	)
}
