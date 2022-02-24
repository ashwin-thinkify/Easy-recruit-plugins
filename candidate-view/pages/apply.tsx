import type { NextPage } from 'next'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import setDetailsByLinkedInId from '../services/setDetailsByLinkedInId';
import { useRouter } from 'next/router'

type UserSubmitForm = {
  name: string;
  email?: string;
  contact?: string;
  currentSalary?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  linkedInProfile: string;
  gitHub: string;
};

const Apply: NextPage = () => {

  const router = useRouter();
  console.log('router:',router.query.name,router.query.linkedInProfile);


  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    currentSalary: Yup.string().required('Current CTC is required'),
    expectedSalary: Yup.string().required('Expected CTC is required'),
    noticePeriod: Yup.string().required('NoticePeriod is required'),
    linkedInProfile: Yup.string().required('NoticePeriod is required'),
    gitHub: Yup.string().required('NoticePeriod is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    contact: Yup.string()
      .required('Phone Number is required')
      .min(10, 'Please enter 10 digit number')
      .max(10, 'Please enter 10 digit number'),
    // confirmPassword: Yup.string()
    //   .required('Confirm Password is required')
    //   .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data: UserSubmitForm) => {
    console.log(JSON.stringify(data, null, 2));
    const responce = await setDetailsByLinkedInId({
      ...data,
    });
    console.log('responce:',responce);
    if(responce?.email){
      router.push('/test-page');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        defaultValue={router?.query?.name || ''}
                        autoComplete="given-name"
                        {...register('name')}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md form-control ${errors.name ? 'is-invalid' : ''}`}
                      />
                      <div className="text-red-500">{errors.name?.message}</div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Contact
                      </label>
                      <input
                        type="text"
                        id="contact"
                        defaultValue={router?.query?.contact || ''}
                        autoComplete="given-name"
                        {...register('contact')}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md form-control ${errors.contact ? 'is-invalid' : ''}`}
                      />
                      <div className="text-red-500">{errors.contact?.message}</div>
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email-address"
                        defaultValue={router?.query?.email || ''}
                        autoComplete="email"
                        {...register('email')}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md form-control ${errors.email ? 'is-invalid' : ''}`}
                      />
                      <div className="text-red-500">{errors.email?.message}</div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Current CTC
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        autoComplete="given-name"
                        {...register('currentSalary')}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md form-control ${errors.currentSalary ? 'is-invalid' : ''}`}
                      />
                      <div className="text-red-500">{errors.currentSalary?.message}</div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Contact
                      </label>
                      <input
                        type="text"
                        id="contact"
                        autoComplete="given-name"
                        {...register('expectedSalary')}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md form-control ${errors.expectedSalary ? 'is-invalid' : ''}`}
                      />
                      <div className="text-red-500">{errors.expectedSalary?.message}</div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Notice Period
                      </label>
                      <select
                        {...register("noticePeriod", { required: true })}
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm form-control ${errors.noticePeriod ? 'is-invalid' : ''}`}
                      >
                            <option value="immediate">immediate</option>
                            <option value="less than 15 days">less than 15 days</option>
                            <option value="less than 30 days">less than 30 days</option>
                            <option value="less than 90 days">less than 90 days</option>
                      </select>
                      <div className="text-red-500">{errors.noticePeriod?.message}</div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        GitHub
                      </label>
                      <input
                        type="text"
                        id="gitHUb"
                        defaultValue={router?.query?.gitHub || ''}
                        autoComplete="given-name"
                        {...register('gitHub')}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md form-control ${errors.gitHub ? 'is-invalid' : ''}`}
                      />
                      <div className="text-red-500">{errors.gitHub?.message}</div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                       LinkedInProfile
                      </label>
                      <input
                        type="text"
                        id="linkedInProfile"
                        defaultValue={router?.query?.linkedInProfile || ''}
                        autoComplete="given-linkedInProfile"
                        {...register('linkedInProfile')}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md form-control ${errors.linkedInProfile ? 'is-invalid' : ''}`}
                      />
                      <div className="text-red-500">{errors.linkedInProfile?.message}</div>
                    </div>

                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
    </div>
  )
}

export default Apply;

