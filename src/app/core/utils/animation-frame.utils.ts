const noop = () => {};

export function scheduleCallbackWithRafRace(callback: () => void): () => void {
	let activeCallback = callback;
	let timeoutId: ReturnType<typeof setTimeout> | undefined;
	let animationFrameId: number | undefined;

	const cleanup = () => {
		activeCallback = noop;

		try {
			if (animationFrameId !== undefined && typeof globalThis.cancelAnimationFrame === 'function') {
				globalThis.cancelAnimationFrame(animationFrameId);
			}

			if (timeoutId !== undefined) {
				clearTimeout(timeoutId);
			}
		} catch {
			// Match Angular's defensive cleanup around browser scheduling APIs.
		}

		animationFrameId = undefined;
		timeoutId = undefined;
	};

	const runAndCleanup = () => {
		activeCallback();
		cleanup();
	};

	timeoutId = setTimeout(runAndCleanup);

	if (typeof globalThis.requestAnimationFrame === 'function') {
		animationFrameId = globalThis.requestAnimationFrame(runAndCleanup);
	}

	return cleanup;
}
