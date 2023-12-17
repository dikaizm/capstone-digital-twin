import { useRef, useEffect } from 'react';

interface HeadProps {
    title: string;
    prevailOnMount?: boolean;
}

export default function Head({ title, prevailOnMount = false }: HeadProps) {
    const defaultTitle = useRef(document.title)

    useEffect(() => {
        document.title = title + " | Inalum Digital Twin"
    }, [title])

    useEffect(() => {
        const cleanup = () => {
            if (!prevailOnMount) {
                document.title = defaultTitle.current
            }
        }

        return cleanup
    }, [prevailOnMount])

    return null
}