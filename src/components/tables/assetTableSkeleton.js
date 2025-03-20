import {Skeleton, Stack, useTheme} from '@chakra-ui/react';
import {motion} from 'framer-motion';

const StaggeredSkeleton = ({children, isLoading}) => {
  const theme = useTheme()
  return (
    <Stack spacing={4}>
      <motion.div
        initial={{opacity: 0, y: 5}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 1, delay: 0 * 1}}
      >
        <Skeleton
          w="full"
          startColor={theme.theme_name !== "light"
            ? "matador_border_color.200"
            : "matador_border_color.100"}
          endColor="#f4f4f4"
          isLoaded={!isLoading}
          minH="50px"
          maxH="fit-content"
          fadeDuration={1}
          borderRadius="5px"
          mt={0}
        >
          {isLoading ? null : children}
        </Skeleton>
      </motion.div>
      {isLoading ? (
        <motion.div
          initial={{opacity: 0, y: 5}}
          animate={{opacity: 1, y: 0, display: isLoading ? '' : 'none'}}
          transition={{duration: 1, delay: 1 * 1}}
        >
          <Skeleton
            startColor="#E4E4E4"
            endColor="#f4f4f4"
            isLoaded={!isLoading}
            height="50px"
            fadeDuration={1}
            borderRadius="5px"
          />
        </motion.div>
      ) : null}
      {isLoading ? (
        <motion.div
          initial={{opacity: 0, y: 5}}
          animate={{opacity: 1, y: 0, display: isLoading ? '' : 'none'}}
          transition={{duration: 1, delay: 2 * 1}}
        >
          <Skeleton
            startColor="#E4E4E4"
            endColor="#f4f4f4"
            isLoaded={!isLoading}
            height="50px"
            fadeDuration={1}
            borderRadius="5px"
          />
        </motion.div>
      ) : null}
    </Stack>
  );
};

export default StaggeredSkeleton;
