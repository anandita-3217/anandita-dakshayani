import { SkillIcon } from "./components/SkillIcon";
import { Flex, Text } from "@chakra-ui/react";

export default function SkillsGrid() {
  const skills = [
    { name: "code", label: "JavaScript" },
    { name: "database", label: "SQL" },
    { name: "brain", label: "Machine Learning" },
    { name: "cloud-cog", label: "AWS" },
  ];

  return (
    <Flex wrap="wrap" gap={6}>
      {skills.map((skill) => (
        <Flex
          key={skill.name}
          direction="column"
          align="center"
          justify="center"
          w="80px"
          _hover={{ transform: "translateY(-4px)" }}
          transition="0.2s"
        >
          <SkillIcon name={skill.name} size={28} />
          <Text mt={2} fontSize="sm">
            {skill.label}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}
