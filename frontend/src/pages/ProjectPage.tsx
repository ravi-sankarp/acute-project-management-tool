import { useState } from 'react';
import * as yup from 'yup';
import { Alert, Box, CircularProgress, Grid, Typography } from '@mui/material';
import { EditorState } from 'draft-js';
import FormDrawer from '../components/FormDrawer';
import TextEditor from '../components/Forms/TextEditor';
import ErrorField from '../components/Styled/ErrorFieldStyled';
import InputField from '../components/Styled/InputFieldStyled';
import LabelStyled from '../components/Styled/LabelStyled';
import PrimaryButton from '../components/Styled/PrimaryButton';
import useToggleDrawer from '../hooks/useToggleDrawer';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Cancel } from '@mui/icons-material';
import { IProjectPayload } from '../Types/ProjectInterface';

function ProjectPage() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { drawerOpen, toggleDrawerState } = useToggleDrawer();
  const [formError, setFormError] = useState('');
  // const [userRegister, { isLoading }] = useUserSignupMutation();

  const schema = yup.object().shape({
    title: yup
      .string()
      .required('Please enter the project title')
      .min(1, 'Project title must be atleast 1 character'),
    startDate: yup
      .date()
      .required('Please enter the project start date')
      .typeError('Enter a valid date'),
    endDate: yup
      .date()
      .required('Please enter the project end date')
      .typeError('Enter a valid date')
      .min(yup.ref('startDate'), 'End date cannot be before start date')
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IProjectPayload>({
    resolver: yupResolver(schema)
  });

  const onSubmitHandler: SubmitHandler<IProjectPayload> = async (data) => {
    console.log(data);
    // if (!isLoading) {
    //   try {
    //     const res = await userRegister(data).unwrap();
    //     setFormError('');
    //     toast.success('Registration Successfull', {
    //       position: 'bottom-center',
    //       autoClose: 2000,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       closeButton: true
    //     });
    //   } catch (error) {
    //     const err = error as { data: { message: string } };
    //     setFormError(err?.data?.message);
    //   }
    // }
  };

  return (
    <Box>
      <PrimaryButton onClick={toggleDrawerState}>New Project</PrimaryButton>
      <FormDrawer
        drawerOpen={drawerOpen}
        toggleDrawerState={toggleDrawerState}
      >
        <>
          <Cancel
            sx={{ mt: 2, ml: 3 }}
            onClick={toggleDrawerState}
          />
          <Box
            sx={{
              my: 1,
              maxWidth: { md: '60vw' },
              px: 4,
              py: 1,
              textAlign: 'center',
              backgroundColor: '#ffffff',
              display: 'flex',
              flexDirection: 'column'
            }}
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <Typography
              variant="h5"
              component="h1"
              sx={{ mb: '2rem', textAlign: 'center' }}
            >
              New Project
            </Typography>

            {formError && (
              <Alert
                sx={{ mb: 1 }}
                severity="error"
              >
                {formError}!
              </Alert>
            )}
            <Grid
              container
              spacing={1}
              textAlign="left"
              sx={{
                mb: 3
              }}
            >
              <Grid
                item
                xs={12}
              >
                <LabelStyled htmlFor="title">Project Title</LabelStyled>
                <InputField
                  placeholder="Enter a title for your project"
                  inputProps={{ 'aria-label': 'project-name' }}
                  {...register('title')}
                />

                <ErrorField style={errors.title ? {} : { marginBottom: '19px' }}>
                  {errors.title ? errors.title.message : ''}
                </ErrorField>
              </Grid>
              <Grid
                item
                sm={6}
                xs={12}
              >
                <LabelStyled htmlFor="startDate">Start Date</LabelStyled>
                <InputField
                  type="date"
                  inputProps={{ 'aria-label': 'start-date' }}
                  {...register('startDate')}
                />

                <ErrorField style={errors.startDate ? {} : { marginBottom: '19px' }}>
                  {errors.startDate ? errors.startDate.message : ''}
                </ErrorField>
              </Grid>
              <Grid
                item
                sm={6}
                xs={12}
              >
                <LabelStyled htmlFor="endDate">End Date</LabelStyled>
                <InputField
                  type="date"
                  inputProps={{ 'aria-label': 'end-date' }}
                  {...register('endDate')}
                />

                <ErrorField style={errors.endDate ? {} : { marginBottom: '19px' }}>
                  {errors.endDate ? errors.endDate.message : ''}
                </ErrorField>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <LabelStyled htmlFor="overview">Project Overview</LabelStyled>
                <TextEditor
                  editorState={editorState}
                  setEditorState={setEditorState}
                />

                <ErrorField style={errors.overview ? {} : { marginBottom: '19px' }}>
                  {errors.overview ? errors.overview.message : ''}
                </ErrorField>
              </Grid>
            </Grid>

            <Box
              sx={{ position: 'fixed', bottom: 0, pb: 2, backgroundColor: '#fff', width: '100%' }}
            >
              <PrimaryButton type="submit">
                {false ? (
                  <CircularProgress
                    color="secondary"
                    sx={{ maxHeight: '20px', maxWidth: '20px' }}
                  />
                ) : (
                  'Add Project'
                )}
              </PrimaryButton>
            </Box>
          </Box>
        </>
      </FormDrawer>
    </Box>
  );
}

export default ProjectPage;
