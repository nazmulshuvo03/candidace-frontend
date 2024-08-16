import { PageBlock } from "../components/Layouts/PageBlock";
import { PageConentBlock } from "../components/Layouts/PageContentBlock";

const CustomUl = ({ children }) => <ul className="pl-6">{children}</ul>;

const CustomLi = ({ children }) => (
  <li style={{ listStyle: "outside" }} className="!text-text">
    {children}
  </li>
);

const HowItWorks = () => {
  return (
    <PageBlock title="How it Works">
      <PageConentBlock title="How to Schedule your Mock Interview">
        <CustomUl>
          <CustomLi>Go to the Profile tab and Complete your profile.</CustomLi>
          <CustomLi>Set you availability for the week.</CustomLi>
          <CustomLi>
            Search for matching candidates on Search and Schedule tab.
          </CustomLi>
          <CustomLi>Filter and sort based on your requirements.</CustomLi>
          <CustomLi>
            Click on their availability and schedule an appointment.
          </CustomLi>
          <CustomLi>
            A 1.5 hour slot will be reserved on both your calendars.
          </CustomLi>
          <CustomLi>
            You will receive a link in your registered email with details to the
            meeting.
          </CustomLi>
        </CustomUl>
      </PageConentBlock>
      <PageConentBlock title="How to Join a Scheduled Interview">
        <CustomUl>
          <CustomLi>
            Go to the Profile tab and Complete your profile.All your scheduled
            mock interviews will appear on the Interviews tab.
          </CustomLi>
          <CustomLi>
            You can join the meeting from the link sent to your email or from
            the Today’s meetings section on the Interview tab.
          </CustomLi>
          <CustomLi>
            If you aren’t able to make it to a meeting you can reschedule or
            cancel the meeting in advance.
          </CustomLi>
          <CustomLi>
            Rescheduling a meeting will allow you to pick a different time slot
            based on both your availability.
          </CustomLi>
          <CustomLi>
            Once you reschedule a meeting, the new date and time of the meeting
            will get updated and you will receive a new meeting lnk
          </CustomLi>
        </CustomUl>
      </PageConentBlock>
      <PageConentBlock title="What Happens in an Interview">
        <CustomUl>
          <CustomLi>
            Once you join a scheduled call, both of you will take turns being
            the interviewer and interviewee.
          </CustomLi>
          <CustomLi>
            Set you availability for the week.You must be prepared with
            questions to ask your practice partner based on the interest area
            you have decided to practice for the call.
          </CustomLi>
          <CustomLi>
            Each person will get 30 minutes each of interview practice time,
            followed by 15 minutes of feedback and review.
          </CustomLi>
          <CustomLi>The total interview slot is for 1.5 hours.</CustomLi>
          <CustomLi>
            Once the interview is over, you must go to the Interview Tab and
            complete a short feedback and review of your practice partner as an
            interviewer as well as a detailed self evaluation of your interview
            performance.
          </CustomLi>
          <CustomLi>
            This will help you track your progress in the Progress tab.
          </CustomLi>
        </CustomUl>
      </PageConentBlock>
      <PageConentBlock title="How to Track my Progress">
        <CustomUl>
          <CustomLi>
            Post each self evaluation after an mock interview, you will receive
            a score of your performance on that interview.
          </CustomLi>
          <CustomLi>
            You can track this score across your interviews on the Progress tab.
          </CustomLi>
          <CustomLi>
            You can also review all your comments and self evaluation for each
            individual interview on the same tab at any time.
          </CustomLi>
          <CustomLi>
            By tracking your progress across each practice area, you can make
            sure you are where you want to be for your next real job interview!
          </CustomLi>
        </CustomUl>
      </PageConentBlock>
    </PageBlock>
  );
};

export default HowItWorks;
