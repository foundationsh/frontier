import { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { Navigate } from 'react-router-dom';

import Button from '@components/Button';
import Input from '@components/Input';
import Page from '@components/Page';

import { useAuth } from '@lib/auth';
import { useLayout } from '@lib/layout';

const Component = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [failed, setFailed] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { isLoggedIn, login } = useAuth();

	const { enableNavbarBlur, disableNavbarBlur } = useLayout();

	useEffect(() => {
		disableNavbarBlur();

		return () => enableNavbarBlur();
	}, []);

	const onSubmit = async () => {
		if (username.length == 0 || password.length == 0) {
			setFailed(true);
			return;
		}

		setIsLoading(true);
		setFailed(await login(username, password));
		setIsLoading(false);
	};

	if (isLoggedIn) return <Navigate to='/dashboard' replace={true} />;

	return (
		<Page>
			<section className='flex h-screen w-screen place-items-center justify-center px-8 pb-8 pt-20 tracking-tighter lg:p-20'>
				<form
					onSubmit={onSubmit}
					className='flex h-[min(50rem,80%)] w-[clamp(30rem,75%,50rem)] flex-col items-center justify-center rounded-lg md:w-[min(30rem,75%)] md:border-ring md:bg-transparent'
				>
					<h1 className='text-gradient m-0 mb-8 font-display text-6xl font-extrabold'>
						Welcome!
					</h1>
					<Input
						className='border-border mb-6 w-[75%] border font-title shadow-sm placeholder:text-[#ffffff22]'
						type='text'
						placeholder='Username'
						value={username}
						style={{
							borderColor: failed ? 'red' : '#333',
						}}
						onChange={(e: any) => setUsername(e.target.value)}
					/>
					<Input
						className='border-border mb-6 w-[75%] border font-title shadow-sm placeholder:text-[#ffffff22]'
						type='password'
						placeholder='Password'
						value={password}
						style={{
							borderColor: failed ? 'red' : '#333',
						}}
						onChange={(e: any) => setPassword(e.target.value)}
					/>
					<Button
						type='submit'
						className='flex h-10 w-[75%] !max-w-none items-center justify-center !border-none !bg-white !text-center !text-[#000] shadow-sm'
						onClick={onSubmit}
						disabled={isLoading}
						variant={{ background: 'primary' }}
						whileHover={{ scale: 1.01 }}
					>
						{isLoading ? (
							<RotatingLines
								strokeColor='grey'
								animationDuration='1.5'
								strokeWidth='5'
								width='20'
							/>
						) : (
							<h1 className='w-full text-center text-sm font-semibold'>
								Sign In
							</h1>
						)}
					</Button>
				</form>
			</section>
		</Page>
	);
};

export default Component;
