import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

const start = async () => {
	try {
		const PORT = process.env.PORT || 5000
		const app = await NestFactory.create(AppModule)
		app.enableCors()
		await app.listen(PORT, () => console.log(`Server Listen port ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}
start()
//Al9tas3pDawFCqTb
