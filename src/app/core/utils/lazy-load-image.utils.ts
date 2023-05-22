/**
 * This a function preloads a list of images asynchronously and returns a Promise containing
 * the loaded images.
 * @param {string[]} images - An array of strings representing the URLs of the images that need to be
 * preloaded.
 * @returns The function `preLoadImages` returns a promise that resolves to an array of strings. The
 * array contains the URLs of the images that were preloaded.
 */
export async function preLoadImages(images: string[]): Promise<string[]> {
	const lazyImagesList = images.map(async (image) => load(image));

	return Promise.all(lazyImagesList);
}

async function load(src: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const image = new Image();

		image.onload = () => {
			resolve(src);
		};

		image.onerror = () => {
			reject(() => {
				console.error('Image loading failed', src);
				throw new Error(`Failed to load image: ${src}`);
			});
		};

		image.src = src;
	});
}
