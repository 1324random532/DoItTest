import { useRef, MutableRefObject, useState, useEffect } from 'react'

type Callback<T> = (filter: T, prevFilter: T) => T | null | undefined | void | Promise<T | null | undefined | void>
export type SetFilter<T> = (filter: Partial<T>, forceUpdate?: boolean) => void
export type UpdateFilter<T> = () => void

interface IConfig<T> {
	delay?: number
	preload?: boolean
	callback: Callback<T>
}

interface Timer {
	timestamp: number
	inProgress?: boolean
	id?: number
}

const defaultDelay = 500;
const timers = new Map<MutableRefObject<IConfig<any>>, Timer>();

export function useFilter<T>(initialFilter: T | (() => T), configOrCallback: IConfig<T> | Callback<T>): [filter: T, setFilter: SetFilter<T>, updateFilter: UpdateFilter<T>] {
	const config = getConfig(configOrCallback);
	const configRef = useRef(config);
	const [filter, setFilter] = useState<T>(initialFilter);

	useEffect(() => { configRef.current = config; }, [config]);

	useEffect(() => {
		if (configRef.current.preload) {
			changeFilter(filter, true);
		}

		return () => {
			timers.delete(configRef);
		}
	}, []);

	function changeFilter(filterChanges: Partial<T>, forceUpdate: boolean = false) {
		setFilter(prevFilter => {
			if (prevFilter != null && typeof prevFilter === 'object') {
				return tryRaise(configRef, prevFilter, { ...prevFilter, ...filterChanges }, forceUpdate);
			}
			else {
				return tryRaise(configRef, prevFilter, <any>filterChanges, forceUpdate);
			}
		});
	}

	function updateFilter() {
		tryRaise(configRef, filter, filter);
	}

	return [filter, changeFilter, updateFilter];
}

function getConfig<T>(config: IConfig<T> | Callback<T>): IConfig<T> {
	if (typeof config !== 'function') return config;

	return { delay: defaultDelay, preload: false, callback: config };
}

async function raise<T>(configRef: MutableRefObject<IConfig<T>>, prevFilter: T, updatedFilter: T) {
	try {
		timers.set(configRef, { timestamp: Date.now(), inProgress: true });
		await Promise.resolve(configRef.current.callback(updatedFilter, prevFilter));
	}
	finally {
		timers.set(configRef, { timestamp: Date.now(), id: timers.get(configRef)?.id });
	}
}

function tryRaise<T>(configRef: MutableRefObject<IConfig<T>>, prevFilter: T, updatedFilter: T, forceUpdate: boolean = false) {
	const now: number = Date.now();
	const delay: number = configRef.current.delay ?? defaultDelay;
	const timer: Timer = timers.get(configRef) ?? { timestamp: 0 };

	if (timer.id != null) {
		window.clearTimeout(timer.id);
	}

	if (forceUpdate || (!timer.inProgress && now - timer.timestamp > delay)) {
		raise(configRef, prevFilter, updatedFilter);
	}
	else {
		timers.set(configRef,
			{
				timestamp: now,
				inProgress: timer.inProgress,
				id: window.setTimeout(() => raise(configRef, prevFilter, updatedFilter), delay),
			});
	}

	return updatedFilter;
}

export default useFilter