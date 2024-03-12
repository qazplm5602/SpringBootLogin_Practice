// ♻️♻️♻️♻️♻️♻️

export default function Section({title, children, isContainer, ...props}) {
    return <section {...props}>
        {title && <h1>{title}</h1>}
        {/* 🌱 main 이라는 태그 처음 암 ㅋㅋㅋㅋ 🌱 */}
        {isContainer ? <main>{children}</main> : children}
    </section>;
}