import { useForm } from 'react-hook-form';
import classes from './contactUs.module.css';
// import Footer from '../footer/Footer';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    console.log('Form Submitted:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  return (<>
    <section className={classes.contactSection}>
      <h2 className={classes.title}>Contact Us</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div className={classes.fieldGroup}>
          <label>Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className={classes.error}>{errors.name.message}</span>}
        </div>

        <div className={classes.fieldGroup}>
          <label>Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <span className={classes.error}>{errors.email.message}</span>}
        </div>

        <div className={classes.fieldGroup}>
          <label>Message</label>
          <textarea
            {...register('message', { required: 'Message is required' })}
            rows={5}
          ></textarea>
          {errors.message && <span className={classes.error}>{errors.message.message}</span>}
        </div>

        <button type="submit" disabled={isSubmitting} className={classes.submitButton}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {isSubmitSuccessful && <p className={classes.success}>Thank you! We'll be in touch soon.</p>}
      </form>
      {/* <Footer /> */}
    </section>
  </>
  );
};

export default ContactUs;
