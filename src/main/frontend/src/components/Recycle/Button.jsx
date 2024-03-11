// 버튼으로 최대한 재활용 ㄱㄱㄱ♻️♻️♻️♻️
export default function Button({children, icon, text, className, ...props}) {
    const domiClass = [];
    if (typeof className !== "object") {
        domiClass.push(className); // array 아님 밍.
    } else {
        className.forEach(v => domiClass.push(v)); // 풀어 근데 [...className] 으로도 전개 가능한걸로 암. (근데안함 ㅁㄴㅇㄹ)
    }

    return <button className={domiClass.join(" ")} {...props}>
        {icon && <img src={icon} />}
        {text}
        {children}
    </button>
}