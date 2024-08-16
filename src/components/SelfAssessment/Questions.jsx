import { Answers } from "./Answers";

export const Questions = ({
  questions,
  answers = [],
  selections = null,
  setSelections = () => {},
}) => {
  return (
    <div className="py-2">
      <div className="flex gap-4 py-1">
        <div className={"flex-1"} />
        {questions && questions.length && answers && answers.length ? (
          <>
            {answers.map((answer) => (
              <div
                key={answer.id}
                className="col-span-1 items-center justify-self-center text-xs text-gray-400"
              >
                {answer.name}
              </div>
            ))}
          </>
        ) : (
          <div />
        )}
      </div>
      <div>
        {questions && questions.length && selections && selections.length ? (
          <>
            {questions.map((question, i) => {
              return (
                <div className="flex gap-4 py-1" key={question.id}>
                  <div className={"flex-1"}>{question.text}</div>
                  <Answers
                    color="blue"
                    count={answers.length}
                    value={selections[i]}
                    setValue={(ans) =>
                      setSelections((prev) => {
                        const newArray = [...prev];
                        newArray[i] = ans;
                        return newArray;
                      })
                    }
                  />
                </div>
              );
            })}
          </>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
